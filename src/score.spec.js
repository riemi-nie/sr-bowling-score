const { beforeEach, describe, it } = require("mocha");
const assert = require("assert").strict;

const { Score } = require("./score");

describe("class Score", function () {
    let score;

    beforeEach(function () {
        score = new Score();
    });

    it("should have a method calculate()", function () {
        assert.equal(typeof score.calculate, "function");
    });

    describe("method calculate()", function () {
        it("should throw if more than 10 frames are passed in", function () {
            try {
                score.calculate(Array(11).map(() => 1));
                assert.fail("Should throw an Error");
            } catch (e) {
                assert.equal(e.message, "Maximum of 10 frames exceeded");
            }
        });

        describe("given 0 frames", function () {
            it("should always return 0", function () {
                const totalScore = score.calculate([]);
                assert.equal(totalScore, 0);
            });
        });

        describe("given 1 frame", function () {
            describe("and 1 roll", function () {
                describe("with more than 10 pins", function () {
                    it("should throw an Error", function () {
                        try {
                            score.calculate([[11]]);
                            assert.fail("Should throw an Error");
                        } catch (e) {
                            assert.equal(
                                e.message,
                                "Maximum of 10 pins per frame exceeded"
                            );
                        }
                    });
                });
                describe("with 4 pins", function () {
                    it("should calculate a score of 4", function () {
                        const totalScore = score.calculate([[4]]);
                        assert.equal(totalScore, 4);
                    });
                });
            });

            describe("and 2 rolls", function () {
                describe("with 4 and 3 pins", function () {
                    it("should calculate a score of 7", function () {
                        const totalScore = score.calculate([[4, 3]]);
                        assert.equal(totalScore, 7);
                    });
                });
            });
        });

        describe("given 2 frames", function () {
            describe("with rolls [1,4] and [4,5]", function () {
                it("should calculate a score of 14", function () {
                    const totalScore = score.calculate([
                        [1, 4],
                        [4, 5],
                    ]);
                    assert.equal(totalScore, 14);
                });
            });

            describe("and the first roll with exactly 10 pins (STRIKE)", function () {
                describe("when the second frame has 0 on both rolls", function () {
                    it("should have a total score of 10 without bonus (0)", function () {
                        const totalScore = score.calculate([[10], [0, 0]]);
                        assert.equal(totalScore, 10);
                    });
                });

                describe("when the second frame has 4 and 2 as rolls", function () {
                    it("should have a score of 10 plus a bonus of 6", function () {
                        const totalScore = score.calculate([[10], [4, 2]]);
                        assert.equal(totalScore, 22);
                    });
                });
            });

            describe("and the 2 roll with exactly 10 pins (SPARE)", function () {
                describe("when the second frame has 0 on both rolls", function () {
                    it("should have a total score of 10 without bonus (0)", function () {
                        const totalScore = score.calculate([
                            [6, 4],
                            [0, 0],
                        ]);
                        assert.equal(totalScore, 10);
                    });
                });

                describe("when the second frame has 4 and 2 as rolls", function () {
                    it("should have a score of 10 plus a bonus of 6", function () {
                        const totalScore = score.calculate([
                            [6, 4],
                            [4, 2],
                        ]);
                        assert.equal(totalScore, 20);
                    });
                });
            });
        });

        describe("given 4 frames", function () {
            describe("with rolls [1,4] and [4,5] and [6,4], and [5]", function () {
                it("should calculate a score of 14", function () {
                    const totalScore = score.calculate([
                        [1, 4],
                        [4, 5],
                        [6, 4],
                        [5],
                    ]);
                    assert.equal(totalScore, 34);
                });
            });
        });

        describe("given 10 frames", function () {
            describe("with rolls [1,4], [4,5], [6,4], [5,5], [10], [0,1], [7,3], [6,4], [10], [2,8,6]", function () {
                describe("when the 10th frame is a strike", function () {
                    it("should allow a 3rd roll in the last frame which is not added as a bonus resulting in a totals score of 133", function () {
                        const totalScore = score.calculate([
                            [1, 4],
                            [4, 5],
                            [6, 4],
                            [5, 5],
                            [10],
                            [0, 1],
                            [7, 3],
                            [6, 4],
                            [10],
                            [2, 8, 6],
                        ]);
                        assert.equal(totalScore, 133);
                    });
                });
            });
            describe("with rolls [1,4], [4,5], [6,4], [5,5], [10], [0,1], [7,3], [6,4], [10], [10,10,10]", function () {
                describe("when the 10th frame is a strike", function () {
                    it("should allow a 3rd roll in the last frame which is not added as a bonus resulting in a totals score of 157", function () {
                        const totalScore = score.calculate([
                            [1, 4],
                            [4, 5],
                            [6, 4],
                            [5, 5],
                            [10],
                            [0, 1],
                            [7, 3],
                            [6, 4],
                            [10],
                            [10, 10, 10],
                        ]);
                        assert.equal(totalScore, 157);
                    });
                });
            });
        });
    });

    describe("method parse()", function () {
        describe("given an non string input", function () {
            it("should return an empty array", function () {
                const frames = score.parseFrom(undefined);
                assert.strictEqual(Array.isArray(frames), true);
                assert.strictEqual(frames.length, 0);
            });
        });
        describe("given an empty string", function () {
            it("should return an empty array", function () {
                const frames = score.parseFrom(undefined);
                assert.strictEqual(Array.isArray(frames), true);
                assert.strictEqual(frames.length, 0);
            });
        });
        describe("given a number string as '1'", function () {
            it("should return an array within an array holding that number [[1]]", function () {
                const frames = score.parseFrom("1");
                assert.strictEqual(Array.isArray(frames), true);
                assert.strictEqual(Array.isArray(frames[0]), true);
                assert.strictEqual(frames[0][0], 1);
            });
        });
        describe("given an X as string representing a STRIKE", function () {
            it("should return an array within an array holding 10 as number [[10]]", function () {
                const frames = score.parseFrom("X");
                assert.strictEqual(Array.isArray(frames), true);
                assert.strictEqual(Array.isArray(frames[0]), true);
                assert.strictEqual(frames[0][0], 10);
            });
        });
        describe("given a comma separated number string as '1,2'", function () {
            it("should return an array within an array holding these numbers [[1,2]]", function () {
                const frames = score.parseFrom("1,2");
                assert.strictEqual(Array.isArray(frames), true);
                assert.strictEqual(Array.isArray(frames[0]), true);
                assert.strictEqual(frames[0][0], 1);
                assert.strictEqual(frames[0][1], 2);
            });
        });
        describe("given a semicolon separated number string as '1;2'", function () {
            it("should return 2 array within an array holding these numbers [[1], [2]]", function () {
                const frames = score.parseFrom("1;2");
                assert.strictEqual(Array.isArray(frames), true);
                assert.strictEqual(Array.isArray(frames[0]), true);
                assert.strictEqual(Array.isArray(frames[1]), true);
                assert.strictEqual(frames[0][0], 1);
                assert.strictEqual(frames[1][0], 2);
            });
        });

        describe("given an / after an number of 4 as string '4,/' representing a SPARE", function () {
            it("should return an array within an array holding the remaining pins zo 10 as second number [[4,6]]", function () {
                const frames = score.parseFrom("4,/");
                assert.strictEqual(Array.isArray(frames), true);
                assert.strictEqual(Array.isArray(frames[0]), true);
                assert.strictEqual(frames[0][0], 4);
                assert.strictEqual(frames[0][1], 6);
            });
        });
        describe("given '1,4;4,5;6,/;5,/;X;0,1;7,/;6,/;X;2,/,6'", function () {
            it("should return an array within an array holding the remaining pins zo 10 as second number [[4,6]]", function () {
                const frames = score.parseFrom(
                    "1,4;4,5;6,/;5,/;X;0,1;7,/;6,/;X;2,/,6"
                );

                [
                    [1, 4],
                    [4, 5],
                    [6, 4],
                    [5, 5],
                    [10],
                    [0, 1],
                    [7, 3],
                    [6, 4],
                    [10],
                    [2, 8, 6],
                ].forEach((frame, i) => {
                    frame.forEach((roll, j) => {
                        assert.equal(
                            frames[i][j],
                            roll,
                            `Expected roll ${j + 1} of frame ${
                                i + 1
                            } to be strictly equal`
                        );
                    });
                });
            });
        });
    });
});
