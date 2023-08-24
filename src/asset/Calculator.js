import React, { useState } from "react";
import Display from "./Display";
import Buttons from "./Buttons";
import "./Calculator.css";
import { evaluate, round } from "mathjs";

function Calculator() {
    const [input, setInput] = useState("");
    const [answer, setAnswer] = useState("");
    console.log(answer, "line 10");
    console.log(setAnswer, "line 11");

    console.log("dfghgjkl")
    //input
    const inputHandler = (event) => {
        console.log(event, "fghbjnkml", typeof event, "line 16");

        if (answer === "Invalid Input!!") {
            console.log(answer);
            return
        };
        let val = event.target.innerText;
        console.log(event, typeof event, "line 22");
        console.log(val, typeof val, "line 21");


        if (val === "x2") val = "^2";
        else if (val === "x3") val = "^3";
        else if (val === "3√") val = "^(1÷3)";
        else if (val === "√") val = "^(1÷2)";
        else if (val === "log") val = "log(";

        let str = input + val;
        console.log(str, typeof str, "line 31");
        if (str.length > 14) return;

        if (answer !== "") {
            console.log(answer, typeof answer, "line 35");
            setInput(answer + val);
            console.log(setInput(answer + val), typeof setInput, "line 37");
            setAnswer("");
        } else setInput(str);
        setInput(str);
    };

    //Clear screen
    const clearInput = () => {
        setInput("");
        setAnswer("");
    };

    // check brackets are balanced or not
    const checkBracketBalanced = (expr) => {
        console.log(expr, typeof expr, "line 52");
        let stack = [];
        for (let i = 0; i < expr.length; i++) {
            let x = expr[i];
            console.log(x, "line56")
            if (x === "(") {
                stack.push(x);
                console.log(stack);
                console.log(stack.push(x), "line 59")
                continue;
            }

            if (x === ")") {
                if (stack.length === 0) {
                    console.log(stack.length, "line 64")
                    return false;
                }
                else stack.pop();
                console.log(stack);
                console.log(stack.pop(), "line 67");
            }
        }
        console.log(stack.length, "line 70")
        console.log(stack.length === 0, "line 73")
        return stack.length === 0;
    };

    // calculate final answer
    const calculateAns = () => {
        console.log("calculateAns");
        if (input === "") {
            console.log(input, "line78")
            return
        };
        let result = 0;
        console.log(result);
        let finalexpression = input;
        console.log(finalexpression, "line 79");
        //  finalexpression = input.replaceAll("^", "**");  //for eval()
        finalexpression = finalexpression.replaceAll("x", "*");
        finalexpression = finalexpression.replaceAll("÷", "/");

        // evaluate square root
        let noSqrt = input.match(/√[0-9]+/gi);
        console.log(noSqrt, typeof noSqrt);

        if (noSqrt !== null) {
            console.log("x")
            let evalSqrt = input;
            console.log(evalSqrt)
            for (let i = 0; i < noSqrt.length; i++) {
                evalSqrt = evalSqrt.replace(
                    noSqrt[i],
                    console.log(evalSqrt),
                    console.log(noSqrt[i]),
                    `sqrt(${noSqrt[i].substring(1)})`,
                    console.log(`sqrt(${noSqrt[i].substring(1)})`)
                );
            }
            finalexpression = evalSqrt;
        }

        try {
            // check brackets are balanced or not
            if (!checkBracketBalanced(finalexpression)) {
                console.log("checkBracketBalanced");
                const errorMessage = { message: "Brackets are not balanced!" };
                throw errorMessage;
            }
            result = evaluate(finalexpression); //mathjs
            console.log(result, typeof result);

        } catch (error) {
            console.log(error, "line 105");
            result =
                error.message === "Brackets are not balanced!"
                    ? "Brackets are not balanced!"
                    : "Invalid Input!!"; //error.message;
            console.log(error.message, "line 109");
        }
        isNaN(result) ? setAnswer(result) : setAnswer(round(result, 3));
    };

    // remove last character
    const backspace = () => {
        if (answer !== "") {
            setInput(answer.toString().slice(0, -1));
            console.log(setInput(answer.toString().slice(0, -1)), "Line 112");
            setAnswer("");
            // console.log(setAnswer(""));
        } else setInput((prev) => {
            console.log(prev);
            // console.log(setInput((prev) => prev.slice(0, -1)));
            return prev.slice(0, -1)
        }
        );
    };

    // change prefix of expression
    // const changePlusMinus = () => {
    //   //need to change for answer
    //   if (answer === "Invalid Input!!") return;
    //   else if (answer !== "") {
    //     let ans = answer.toString();
    //     if (ans.charAt(0) === "-") {
    //       let plus = "+";
    //       setInput(plus.concat(ans.slice(1, ans.length)));
    //     } else if (ans.charAt(0) === "+") {
    //       let minus = "-";
    //       setInput(minus.concat(ans.slice(1, ans.length)));
    //     } else {
    //       let minus = "-";
    //       setInput(minus.concat(ans));
    //     }
    //     setAnswer("");
    //   } else {
    //     if (input.charAt(0) === "-") {
    //       let plus = "+";
    //       setInput((prev) => plus.concat(prev.slice(1, prev.length)));
    //     } else if (input.charAt(0) === "+") {
    //       let minus = "-";
    //       setInput((prev) => minus.concat(prev.slice(1, prev.length)));
    //     } else {
    //       let minus = "-";
    //       setInput((prev) => minus.concat(prev));
    //     }
    //   }
    // };

    return (
        <>
            <div className="container">
                <div className="main">
                    <Display input={input} setInput={setInput} answer={answer} />
                    <Buttons
                        inputHandler={inputHandler}
                        clearInput={clearInput}
                        backspace={backspace}
                        // changePlusMinus={changePlusMinus}
                        calculateAns={calculateAns}
                    />
                </div>
            </div>
        </>
    );
}

export default Calculator;
