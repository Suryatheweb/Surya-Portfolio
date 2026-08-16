"""
Snake Game - Classic implementation in Python using pygame.

Controls:
    Arrow Keys / WASD : Move the snake
    P                  : Pause / Resume
    R                  : Restart after Game Over
    ESC                : Quit the game

Requirements:
    pip install pygame
"""

import random
import sys
from enum import Enum

import pygame


# ----------------------------- Configuration ----------------------------- #

CELL_SIZE = 20               # size of each grid cell in pixels
GRID_WIDTH = 30              # number of cells horizontally
GRID_HEIGHT = 20             # number of cells vertically
WINDOW_WIDTH = CELL_SIZE * GRID_WIDTH
WINDOW_HEIGHT = CELL_SIZE * GRID_HEIGHT
FPS = 12                     # game speed (frames per second)

# Colors (R, G, B)
COLOR_BG = (18, 18, 24)
COLOR_GRID = (28, 28, 36)
COLOR_SNAKE_HEAD = (102, 255, 178)
COLOR_SNAKE_BODY = (72, 200, 140)
COLOR_SNAKE_OUTLINE = (20, 20, 28)
COLOR_FOOD = (255, 82, 82)
COLOR_FOOD_GLOW = (255, 120, 120)
COLOR_TEXT = (235, 235, 235)
COLOR_TEXT_DIM = (150, 150, 160)


# ------------------------------ Game Logic ------------------------------ #

class Direction(Enum):
    UP = (0, -1)
    DOWN = (0, 1)
    LEFT = (-1, 0)
    RIGHT = (1, 0)

    @property
    def opposite(self):
        dx, dy = self.value
        return Direction((-dx, -dy))


class SnakeGame:
    """Encapsulates all game state and rules."""

    def __init__(self):
        self.reset()

    def reset(self):
        center = (GRID_WIDTH // 2, GRID_HEIGHT // 2)
        # Start with a short snake of 3 segments moving right
        self.snake = [
            center,
            (center[0] - 1, center[1]),
            (center[0] - 2, center[1]),
        ]
        self.direction = Direction.RIGHT
        self.next_direction = Direction.RIGHT
        self.score = 0
        self.high_score = getattr(self, "high_score", 0)
        self.game_over = False
        self.paused = False
        self.spawn_food()

    def spawn_food(self):
        """Place food on a random cell that isn't occupied by the snake."""
        empty_cells = [
            (x, y)
            for x in range(GRID_WIDTH)
            for y in range(GRID_HEIGHT)
            if (x, y) not in self.snake
        ]
        self.food = random.choice(empty_cells)

    def change_direction(self, new_dir: Direction):
        """Queue a direction change, ignoring 180° reversals."""
        if new_dir == self.direction.opposite:
            return
        self.next_direction = new_dir

    def step(self):
        """Advance the game by one frame."""
        if self.game_over or self.paused:
            return

        # Apply queued direction
        self.direction = self.next_direction
        dx, dy = self.direction.value
        head_x, head_y = self.snake[0]
        new_head = (head_x + dx, head_y + dy)

        # Check wall collision
        if (
            new_head[0] < 0
            or new_head[0] >= GRID_WIDTH
            or new_head[1] < 0
            or new_head[1] >= GRID_HEIGHT
        ):
            self._end_game()
            return

        # Check self collision (allow moving into current tail since it will move)
        if new_head in self.snake[:-1]:
            self._end_game()
            return

        self.snake.insert(0, new_head)

        # Check food collision
        if new_head == self.food:
            self.score += 1
            if self.score > self.high_score:
                self.high_score = self.score
            if len(self.snake) >= GRID_WIDTH * GRID_HEIGHT:
                # Win condition: snake fills the board
                self.game_over = True
                return
            self.spawn_food()
        else:
            self.snake.pop()  # move forward

    def _end_game(self):
        self.game_over = True


# ------------------------------ Rendering ------------------------------ #

def draw_grid(surface):
    for x in range(0, WINDOW_WIDTH, CELL_SIZE):
        pygame.draw.line(surface, COLOR_GRID, (x, 0), (x, WINDOW_HEIGHT))
    for y in range(0, WINDOW_HEIGHT, CELL_SIZE):
        pygame.draw.line(surface, COLOR_GRID, (0, y), (WINDOW_WIDTH, y))


def draw_food(surface, food):
    fx, fy = food
    rect = pygame.Rect(
        fx * CELL_SIZE + 2, fy * CELL_SIZE + 2,
        CELL_SIZE - 4, CELL_SIZE - 4
    )
    # Soft glow underneath
    glow = rect.inflate(6, 6)
    pygame.draw.ellipse(surface, COLOR_FOOD_GLOW, glow)
    pygame.draw.ellipse(surface, COLOR_FOOD, rect)


def draw_snake(surface, snake):
    for i, (sx, sy) in enumerate(snake):
        rect = pygame.Rect(
            sx * CELL_SIZE + 1, sy * CELL_SIZE + 1,
            CELL_SIZE - 2, CELL_SIZE - 2
        )
        color = COLOR_SNAKE_HEAD if i == 0 else COLOR_SNAKE_BODY
        pygame.draw.rect(surface, color, rect, border_radius=4)
        pygame.draw.rect(surface, COLOR_SNAKE_OUTLINE, rect, width=1, border_radius=4)

    # Eyes on the head
    head_x, head_y = snake[0]
    cx, cy = head_x * CELL_SIZE + CELL_SIZE // 2, head_y * CELL_SIZE + CELL_SIZE // 2
    eye_offset = 4
    pygame.draw.circle(surface, (20, 20, 28), (cx - eye_offset, cy - eye_offset), 2)
    pygame.draw.circle(surface, (20, 20, 28), (cx + eye_offset, cy - eye_offset), 2)


def draw_hud(surface, font, game: SnakeGame):
    score_text = font.render(f"Score: {game.score}", True, COLOR_TEXT)
    high_text = font.render(f"High: {game.high_score}", True, COLOR_TEXT_DIM)
    surface.blit(score_text, (10, 6))
    surface.blit(high_text, (WINDOW_WIDTH - high_text.get_width() - 10, 6))


def draw_centered_text(surface, font_large, font_small, lines):
    total_height = sum(
        font_large.get_height() if i == 0 else font_small.get_height() + 6
        for i, _ in enumerate(lines)
    )
    y = (WINDOW_HEIGHT - total_height) // 2

    for i, (text, kind) in enumerate(lines):
        font = font_large if kind == "title" else font_small
        rendered = font.render(text, True, COLOR_TEXT)
        x = (WINDOW_WIDTH - rendered.get_width()) // 2
        surface.blit(rendered, (x, y))
        y += rendered.get_height() + 6


# -------------------------------- Main -------------------------------- #

def main():
    pygame.init()
    pygame.display.set_caption("Snake Game")
    screen = pygame.display.set_mode((WINDOW_WIDTH, WINDOW_HEIGHT))
    clock = pygame.time.Clock()

    font = pygame.font.SysFont("consolas", 18)
    font_large = pygame.font.SysFont("consolas", 36, bold=True)
    font_small = pygame.font.SysFont("consolas", 18)

    game = SnakeGame()

    while True:
        # ---- Events ----
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                pygame.quit()
                sys.exit()

            if event.type == pygame.KEYDOWN:
                if event.key in (pygame.K_ESCAPE,):
                    pygame.quit()
                    sys.exit()

                if game.game_over:
                    if event.key == pygame.K_r:
                        game.reset()
                    continue

                if event.key == pygame.K_p:
                    game.paused = not game.paused
                    continue

                # Movement keys
                key_to_dir = {
                    pygame.K_UP: Direction.UP,
                    pygame.K_w: Direction.UP,
                    pygame.K_DOWN: Direction.DOWN,
                    pygame.K_s: Direction.DOWN,
                    pygame.K_LEFT: Direction.LEFT,
                    pygame.K_a: Direction.LEFT,
                    pygame.K_RIGHT: Direction.RIGHT,
                    pygame.K_d: Direction.RIGHT,
                }
                if event.key in key_to_dir:
                    game.change_direction(key_to_dir[event.key])

        # ---- Update ----
        game.step()

        # ---- Render ----
        screen.fill(COLOR_BG)
        draw_grid(screen)
        draw_food(screen, game.food)
        draw_snake(screen, game.snake)
        draw_hud(screen, font, game)

        if game.paused and not game.game_over:
            overlay = pygame.Surface((WINDOW_WIDTH, WINDOW_HEIGHT), pygame.SRCALPHA)
            overlay.fill((0, 0, 0, 140))
            screen.blit(overlay, (0, 0))
            draw_centered_text(
                screen, font_large, font_small,
                [("Paused", "title"), ("Press P to resume", "sub")],
            )

        if game.game_over:
            overlay = pygame.Surface((WINDOW_WIDTH, WINDOW_HEIGHT), pygame.SRCALPHA)
            overlay.fill((0, 0, 0, 170))
            screen.blit(overlay, (0, 0))
            draw_centered_text(
                screen, font_large, font_small,
                [
                    ("Game Over", "title"),
                    (f"Final Score: {game.score}", "sub"),
                    (f"High Score: {game.high_score}", "sub"),
                    ("Press R to restart or ESC to quit", "sub"),
                ],
            )

        pygame.display.flip()
        clock.tick(FPS)


if __name__ == "__main__":
    main()
