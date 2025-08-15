#!/usr/bin/env python3
"""
Simple Number Guessing Game
A basic game using only core Python functionality
"""

import random

def number_guessing_game():
    """Main game function"""
    print("Welcome to the Number Guessing Game!")
    print("I'm thinking of a number between 1 and 100.")
    
    # Generate random number between 1 and 100
    secret_number = random.randint(1, 100)
    attempts = 0
    max_attempts = 10
    
    print(f"You have {max_attempts} attempts to guess the number.")
    
    while attempts < max_attempts:
        try:
            # Get user input
            guess = input(f"\nEnter your guess (attempt {attempts + 1}/{max_attempts}): ")
            
            # Validate input
            if not guess.isdigit():
                print("Please enter a valid number!")
                continue
                
            guess = int(guess)
            attempts += 1
            
            # Check the guess
            if guess < secret_number:
                print("Too low! Try a higher number.")
            elif guess > secret_number:
                print("Too high! Try a lower number.")
            else:
                print(f"\n🎉 Congratulations! You guessed it in {attempts} attempts!")
                print(f"The number was {secret_number}")
                return True
                
            # Show remaining attempts
            remaining = max_attempts - attempts
            if remaining > 0:
                print(f"Attempts remaining: {remaining}")
                
        except KeyboardInterrupt:
            print("\n\nGame interrupted. Goodbye!")
            return False
    
    # Game over - ran out of attempts
    print(f"\n😔 Game Over! You ran out of attempts.")
    print(f"The number was {secret_number}")
    return False

def play_again():
    """Ask if player wants to play again"""
    while True:
        choice = input("\nWould you like to play again? (yes/no): ").lower().strip()
        if choice in ['yes', 'y']:
            return True
        elif choice in ['no', 'n']:
            return False
        else:
            print("Please enter 'yes' or 'no'.")

def main():
    """Main program loop"""
    print("=" * 50)
    print("NUMBER GUESSING GAME")
    print("=" * 50)
    
    while True:
        number_guessing_game()
        if not play_again():
            print("\nThanks for playing! Goodbye! 👋")
            break

if __name__ == "__main__":
    main()
