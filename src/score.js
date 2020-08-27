"use strict";

/**
 * A class which holds the algorithm to calculate the score of a bowling game.
 */
class Score {
    /**
     * Calculates the score from the frames and rolls of a players game.
     */
    calculate(frames) {
        if (frames.length > 10) {
            throw new Error("Maximum of 10 frames exceeded");
        }

        let sum = 0;
        let bonus = 0;

        let numOfBonusRolls = 0;
        for (let i = 0; i < frames.length; i++) {
            const rolls = frames[i];
            let remainingPins = 10;

            for (let j = 0; j < rolls.length; j++) {
                const curRoll = rolls[j];
                remainingPins -= curRoll;

                const isIrregularFrame = remainingPins < 0;
                if (isIrregularFrame) {
                    throw new Error("Maximum of 10 pins per frame exceeded");
                }

                sum += curRoll;

                const hasBonusRoll = numOfBonusRolls > 0;
                const isAdditionalRollInLastFrame = i === 9 && j === 2;
                if (hasBonusRoll && !isAdditionalRollInLastFrame) {
                    bonus += curRoll;
                    numOfBonusRolls--;
                }

                const isStrike = j === 0 && remainingPins === 0;
                if (isStrike) {
                    numOfBonusRolls += 2;
                }
                const isSpare = j === 1 && remainingPins === 0;
                if (isSpare) {
                    numOfBonusRolls += 1;
                }

                const isLastFrame = i === 9;
                const hasNewPinsRequired = remainingPins === 0;
                if (isLastFrame && hasNewPinsRequired) {
                    remainingPins = 10;
                }
            }
        }
        return sum + bonus;
    }

    parseFrom(rawString) {
        if (typeof rawString !== "string") {
            return [];
        }

        if (rawString.length === 0) {
            return [];
        }

        const frameSeparator = ";";
        const rollSeparator = ",";
        const strikeChar = "X";
        const spareChar = "/";

        const rawFrames = rawString.split(frameSeparator).map((rawFrame) => {
            const frameWithSparesLeft = rawFrame
                .split(rollSeparator)
                .map((rawRoll) => {
                    rawRoll = rawRoll.trim();
                    if (rawRoll === strikeChar) {
                        return 10;
                    }

                    if (rawRoll === spareChar) {
                        return "/";
                    }

                    return Number.parseInt(rawRoll, 10);
                });

            const isSecondRollASpare = frameWithSparesLeft[1] === spareChar;
            if (isSecondRollASpare) {
                frameWithSparesLeft[1] = 10 - frameWithSparesLeft[0];
            }

            return frameWithSparesLeft;
        });

        return rawFrames;
    }
}

module.exports.Score = Score;
