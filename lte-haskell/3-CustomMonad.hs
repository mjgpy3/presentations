module Main where

import Control.Monad

data Hand = Rock | Paper | Scissors deriving Show

data Error
  = UnrecognizedCharacter Char
  | RepeatFound
  | EmptyGame
  deriving Show

data RPSGame a
  = InProgress a
  | Winner Hand
  | Err Error
  deriving Show

instance Functor RPSGame where
  fmap f (InProgress v) = InProgress (f v)
  fmap _ (Winner h) = Winner h
  fmap _ (Err e) = Err e

instance Applicative RPSGame where
  pure = InProgress

  InProgress f <*> InProgress v = InProgress (f v)
  _ <*> Err e = Err e
  Winner hand <*> _ = Winner hand
  Err e <*> _ = Err e

instance Monad RPSGame where
  InProgress v >>= f = f v
  Winner hand >>= _ = Winner hand
  Err e >>= _ = Err e

parse :: String -> RPSGame [Hand]
parse ('r':rest) = (Rock :) <$> parse rest
parse ('p':rest) = (Paper :) <$> parse rest
parse ('s':rest) = (Scissors :) <$> parse rest
parse [] = pure []
parse (c:_) = Err (UnrecognizedCharacter c)

guardRepeats :: [Hand] -> RPSGame [Hand]
guardRepeats [] = pure []
guardRepeats [x] = pure [x]
guardRepeats (Scissors:Scissors:_) = Err RepeatFound
guardRepeats (Paper:Paper:_) = Err RepeatFound
guardRepeats (Rock:Rock:_) = Err RepeatFound
guardRepeats (v:rest) = (v :) <$> guardRepeats rest

play :: [Hand] -> RPSGame Hand
play [hand] = Winner hand
play (Rock:Paper:rest) = play (Paper:rest)
play (Paper:Rock:rest) = play (Paper:rest)
play (Scissors:Rock:rest) = play (Rock:rest)
play (Rock:Scissors:rest) = play (Rock:rest)
play (Scissors:Paper:rest) = play (Scissors:rest)
play (Paper:Scissors:rest) = play (Scissors:rest)
play (_:repeats) = play repeats
play _ = Err EmptyGame

game :: String -> RPSGame Hand
game =
  parse >=> guardRepeats >=> play

main = print $ game "rpspr"
