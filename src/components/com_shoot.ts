import { Entity } from "../../lib/world.js";
import { Blueprint } from "../../lib/game.js";
import { Game } from "../game.js";
import { Has } from "../world.js";

export interface Shoot {
    // How fast bullets fire
    Cooldown: number;
    SinceLastShot: number;
    // What blueprint to spawn as bullet
    Projectile: (game: Game) => Blueprint<Game>;
}

/**
 * Add shooting capability to an entity
 * @param cooldown Time between shots (seconds)
 * @param projectile Blueprint function that creates the bullet
 */
export function shoot(cooldown: number, projectile: (game: Game) => Blueprint<Game>) {
    return (game: Game, entity: Entity) => {
        game.World.Signature[entity] |= Has.Shoot;
        game.World.Shoot[entity] = {
            Cooldown: cooldown,
            SinceLastShot: cooldown, // Ready to shoot immediately
            Projectile: projectile,
        };
    };
}
