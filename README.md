# sr-bowling-score
> Calculate the bowling score for a single person game from a text input.

## Prerequisites
To run the code you need to have Node and npm installed.
Check `https://nodejs.org/en/` for detailed installation instruction for you OS.

## Getting started
To start the prompt for scores run the following command in a terminal.
```
$ npm run start
```

You will be prompted to fill in your score in one line. 
Be aware that the current score input parser allows invalid input. 
You should strictly follow the legend in the prompt.

```
Fill in your bowling score.
Rolls are separated by , (comma) and frames by ; (semicolon)

    Legend:
        , -> roll separator
        ; -> frame separator
        X -> is a strike
        / -> is a spare
        0...10 represent the pins
```

An example score could look like this: 
```
1,4;4,5;6,/;5,/;X;0,1;7,/;6,/;X;2,/,6
```

Have fun!

## License

MIT © Sebastian Riemschüssel
