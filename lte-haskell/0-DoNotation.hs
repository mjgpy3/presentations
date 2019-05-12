module Main where

import Control.Monad

data Hand = Rock | Paper | Scissors deriving Show

parse :: String -> Maybe [Hand]
parse ('r':rest) = (Rock :) <$> parse rest
parse ('p':rest) = (Paper :) <$> parse rest
parse ('s':rest) = (Scissors :) <$> parse rest
parse [] = Just []
parse _ = Nothing

guardRepeats :: [Hand] -> Maybe [Hand]
guardRepeats [] = Just []
guardRepeats [x] = Just [x]
guardRepeats (Scissors:Scissors:_) = Nothing
guardRepeats (Paper:Paper:_) = Nothing
guardRepeats (Rock:Rock:_) = Nothing
guardRepeats (v:rest) = (v :) <$> guardRepeats rest

play :: [Hand] -> Maybe Hand
play [hand] = Just hand
play (Rock:Paper:rest) = play (Paper:rest)
play (Paper:Rock:rest) = play (Paper:rest)
play (Scissors:Rock:rest) = play (Rock:rest)
play (Rock:Scissors:rest) = play (Rock:rest)
play (Scissors:Paper:rest) = play (Scissors:rest)
play (Paper:Scissors:rest) = play (Scissors:rest)
play (_:repeats) = play repeats
play _ = Nothing

game :: String -> Maybe Hand
game raw = do
  hands <- parse raw
  uniqHands <- guardRepeats hands
  play uniqHands

main = print $ game "rpspr"
