module Main where

import Control.Monad
import Control.Monad.Trans.Except
import Control.Monad.Trans.Class

data Hand = Rock | Paper | Scissors deriving Show

data Error
  = UnrecognizedCharacter Char
  | RepeatFound
  | EmptyGame
  deriving Show

data RPSGame a
  = InProgress a
  | Winner Hand
  deriving Show

instance Functor RPSGame where
  fmap f (InProgress v) = InProgress (f v)
  fmap _ (Winner h) = Winner h

instance Applicative RPSGame where
  pure = InProgress

  InProgress f <*> InProgress v = InProgress (f v)
  Winner hand <*> _ = Winner hand

instance Monad RPSGame where
  InProgress v >>= f = f v
  Winner hand >>= _ = Winner hand

parse :: String -> ExceptT Error RPSGame [Hand]
parse ('r':rest) = (Rock :) <$> parse rest
parse ('p':rest) = (Paper :) <$> parse rest
parse ('s':rest) = (Scissors :) <$> parse rest
parse [] = pure []
parse (c:_) = throwE (UnrecognizedCharacter c)

guardRepeats :: [Hand] -> ExceptT Error RPSGame [Hand]
guardRepeats [] = pure []
guardRepeats [x] = pure [x]
guardRepeats (Scissors:Scissors:_) = throwE RepeatFound
guardRepeats (Paper:Paper:_) = throwE RepeatFound
guardRepeats (Rock:Rock:_) = throwE RepeatFound
guardRepeats (v:rest) = (v :) <$> guardRepeats rest

play :: [Hand] -> ExceptT Error RPSGame Hand
play [hand] = lift $ Winner hand
play (Rock:Paper:rest) = play (Paper:rest)
play (Paper:Rock:rest) = play (Paper:rest)
play (Scissors:Rock:rest) = play (Rock:rest)
play (Rock:Scissors:rest) = play (Rock:rest)
play (Scissors:Paper:rest) = play (Scissors:rest)
play (Paper:Scissors:rest) = play (Scissors:rest)
play (_:repeats) = play repeats
play _ = throwE EmptyGame

game :: String -> ExceptT Error RPSGame Hand
game =
  parse >=> guardRepeats >=> play

main = print $ runExceptT $ game ""
