import { children } from "../components/com_children.js";
import { render_colored_shaded } from "../components/com_render.js";
import { shoot } from "../components/com_shoot.js";
import { transform } from "../components/com_transform.js";
import { Game } from "../game.js";
import { blueprint_bullet } from "./blu_bullet.js";

export function blueprint_gun(game: Game) {
    return [
        transform([0, -0.3, -0.5]), // position relative to camera/player
        shoot(0.2, blueprint_bullet), // 0.2 sec cooldown between shots
        children([
            transform(undefined, undefined, [0.1, 0.1, 0.5]),
            render_colored_shaded(
                game.MaterialColoredShaded,
                game.MeshCube,
                [0.3, 0.3, 0.3, 1] // gray gun
            ),
        ]),
    ];
}
