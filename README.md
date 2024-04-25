<h1 align="center">
  Sliding Number Puzzle
  <br>
</h1>

<h2 align="center">Play: https://puzzle-alewis.vercel.app/</h2>
<h4 align="center">(aka 15 Puzzle) One of the simplest games that exist.</h4>

<p align="center">
  <img width="1133" alt="image" src="https://github.com/alewis729/sliding-number-puzzle/assets/51219653/d39432e8-ada3-45f0-ac58-5e483902cbfc">
</p>

## Description

If you never played this game, you basically need to strategically shuffle the pieces until you end up with all the numbers in ascending order. Regarding the tech, it's quite simple, I just used ReactJS with Typescript, and wrote a few test cases for the logic of the game functionality with jest. Additionally, I had some fun using framer-motion to animate things a little bit. Also, I used a few other libraries that are probably not even that useful but allowed me to focus on what was more interesting.

It's a pretty simple app, and I'm sure the game already exists on the internet, but I just wanted to take the challenge of creating it from scratch. I actually wrote this a couple years ago, but recently I wanted to improve the UI a bit and fix a couple bugs.

### Interesting notes

While writing a function to randomize the pieces (to create a new position / new game) I found out that there are some positions that are actually impossible to solve. And so it was quite interesting to find a way for an 'unsolvable' position to never be given to the user, as that could be frustrating. That logic can be found in [isSolvable.ts](https://github.com/alewis729/sliding-number-puzzle/blob/master/src/lib/utils/isSolvable.ts#L14).

(Or it could also be fun to write some code to allow the app to show an impossible-to-solve position based on a query param, in case someone would want to troll their friends; maybe I'll do that in the future)

## Run locally

```bash
$ git clone https://github.com/alewis729/sliding-number-puzzle
$ cd sliding-number-puzzle
$ yarn install

$ yarn start
```
