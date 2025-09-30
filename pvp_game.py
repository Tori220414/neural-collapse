import random

def attack(player_name, opponent_health):
    damage = random.randint(10, 30)
    opponent_health -= damage
    print(f"{player_name} attacks for {damage} damage!")
    return opponent_health

def pvp_game():
    player1 = input("Enter name for Player 1: ")
    player2 = input("Enter name for Player 2: ")
    health1 = 100
    health2 = 100

    print(f"\n{player1} vs {player2} — Let the battle begin!\n")

    turn = 0
    while health1 > 0 and health2 > 0:
        if turn % 2 == 0:
            health2 = attack(player1, health2)
            print(f"{player2}'s health: {max(health2, 0)}\n")
        else:
            health1 = attack(player2, health1)
            print(f"{player1}'s health: {max(health1, 0)}\n")
        turn += 1

    winner = player1 if health1 > 0 else player2
    print(f"🏆 {winner} wins the battle!")

pvp_game()