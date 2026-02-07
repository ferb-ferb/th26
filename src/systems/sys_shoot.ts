import { instantiate } from "../../lib/game.js";
import { mat4_get_translation } from "../../lib/mat4.js";
import { Vec3 } from "../../lib/math.js";
import { Entity } from "../../lib/world.js";
import { Game } from "../game.js";
import { Has } from "../world.js";

const QUERY = Has.Transform | Has.Shoot;

export function sys_shoot(game: Game, delta: number) {
    for (let i = 0; i < game.World.Signature.length; i++) {
        if ((game.World.Signature[i] & QUERY) === QUERY) {
            update(game, i, delta);
        }
    }
}

function update(game: Game, entity: Entity, delta: number) {
    let shoot = game.World.Shoot[entity];
    let transform = game.World.Transform[entity];

    // Update cooldown
    shoot.SinceLastShot += delta;

    // Check if player is trying to shoot (e.g., mouse click)
    if (game.InputState["Mouse0"] && shoot.SinceLastShot >= shoot.Cooldown) {
        shoot.SinceLastShot = 0;

        // Get gun's position
        let position: Vec3 = [0, 0, 0];
        mat4_get_translation(position, transform.World);
        
        // Get gun's forward direction (from rotation)
        // The forward direction is -Z in the local space
        let forward: Vec3 = [
            -2 * (transform.Rotation[0] * transform.Rotation[2] + transform.Rotation[3] * transform.Rotation[1]),
            -2 * (transform.Rotation[1] * transform.Rotation[2] - transform.Rotation[3] * transform.Rotation[0]),
            -(1 - 2 * (transform.Rotation[0] * transform.Rotation[0] + transform.Rotation[1] * transform.Rotation[1]))
        ];

        // Spawn bullet
        instantiate(game, [
            ...shoot.Projectile(game),
            (game: Game, bullet: Entity) => {
                // Set bullet position
                let bullet_transform = game.World.Transform[bullet];
                bullet_transform.Translation[0] = position[0];
                bullet_transform.Translation[1] = position[1];
                bullet_transform.Translation[2] = position[2];
                
                // Set bullet velocity to move forward
                let bullet_move = game.World.Move[bullet];
                bullet_move.Direction[0] = forward[0];
                bullet_move.Direction[1] = forward[1];
                bullet_move.Direction[2] = forward[2];
                bullet_move.MoveSpeed = 50; // bullet speed
                
                game.World.Signature[bullet] |= Has.Dirty;
            },
        ]);
    }
}
