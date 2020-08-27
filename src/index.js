const { ask } = require("stdio");
const { Score } = require("./score");

const score = new Score();

ask(
    `
Fill in your bowling score.
Rolls are separated by , (comma) and frames by ; (semicolon)

    Legend:
        , -> roll separator
        ; -> frame separator
        X -> is a strike
        / -> is a spare
        0...10 represent the pins

`
)
    .then((rawScoreboard) => {
        const totalScore = score.calculate(score.parseFrom(rawScoreboard));
        console.log("Your total score:", totalScore);
    })
    .catch((err) => console.error(err.message));
