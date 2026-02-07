import { children } from "../components/com_children.js";
import { collide } from "../components/com_collide.js";
import { lifespan } from "../components/com_lifespan.js";
import { move } from "../components/com_move.js";
import { render_colored_shaded } from "../components/com_render.js";
import { transform } from "../components/com_transform.js";
import { Game, Layer } from "../game.js";

export function blueprint_bullet(game: Game) {
    return [
        transform(undefined, undefined, [0.2, 0.2, 0.2]), // small bullet
        move(0, 0), // no rotation, just forward movement
        collide(true, Layer.Projectile, Layer.Terrain | Layer.Enemy),
        lifespan(3), // disappears after 3 seconds
        children([
            transform(),
            render_colored_shaded(
                game.MaterialColoredShaded,
                game.MeshCube,
                [1, 1, 0, 1] // yellow bullet
            ),
        ]),
    ];
}
