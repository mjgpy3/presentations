module Main where

import Control.Monad

data Hand = Rock | Paper | Scissors deriving Show

data Error
  = UnrecognizedCharacter Char
  | RepeatFound
  | EmptyGame
  deriving Show

parse :: String -> Either Error [Hand]
parse ('r':rest) = (Rock :) <$> parse rest
parse ('p':rest) = (Paper :) <$> parse rest
parse ('s':rest) = (Scissors :) <$> parse rest
parse [] = pure []
parse (c:_) = Left (UnrecognizedCharacter c)

guardRepeats :: [Hand] -> Either Error [Hand]
guardRepeats [] = pure []
guardRepeats [x] = pure [x]
guardRepeats (Scissors:Scissors:_) = Left RepeatFound
guardRepeats (Paper:Paper:_) = Left RepeatFound
guardRepeats (Rock:Rock:_) = Left RepeatFound
guardRepeats (v:rest) = (v :) <$> guardRepeats rest

play :: [Hand] -> Either Error Hand
play [hand] = pure hand
play (Rock:Paper:rest) = play (Paper:rest)
play (Paper:Rock:rest) = play (Paper:rest)
play (Scissors:Rock:rest) = play (Rock:rest)
play (Rock:Scissors:rest) = play (Rock:rest)
play (Scissors:Paper:rest) = play (Scissors:rest)
play (Paper:Scissors:rest) = play (Scissors:rest)
play (_:repeats) = play repeats
play _ = Left EmptyGame

game :: String -> Either Error Hand
game =
  parse >=> guardRepeats >=> play

main = print $ game "rpspr"
