"use client";

import { isEmpty, isEqual } from "lodash";
import React, { useState } from "react";
import { FaDotCircle } from "react-icons/fa";

import DefaultButton from "../Button/DefaultButton";
import Label from "../Inputs/Label";
import TextInput from "../Inputs/TextInput";
import ErrorMessage from "../Message/ErrorMessage";
import { toastSuccess } from "../Shared/ToastHelpers";

const BodyListItem = React.memo(({ list }) => {
  const noData = isEmpty(list);
  if (noData) {
    return (
      <div className="text-2xl font-semibold my-4 h-1/2 flex flex-col gap-3 justify-center items-center">
        <h1>No Question Found</h1>
        <h1>Please Add Some Question</h1>
      </div>
    );
  }

  return (
    <div className="m-2">
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {list.map((quiz, index) => (
          <li key={index}>
            <h2 className="font-medium">
              {index < 9 || index < "9" ? `0${index + 1}` : index + 1}:{" "}
              {quiz.question}
            </h2>
            <ul className="grid grid-cols-2 gap-3 ml-3 text-sm mt-1">
              {quiz.options.map((option, index) => (
                <li key={index} className="flex gap-2 items-start">
                  <div className="h-3">
                    <FaDotCircle size={14} />
                  </div>
                  <span className="-mt-[3px]">{option}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}, isEqual);

BodyListItem.displayName = "BodyListItem";

function AddQuizForm() {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [errors, setErrors] = useState({
    question: "",
    options: "",
  });
  const [quizList, setQuizList] = useState([]);

  const handleSubmit = () => {
    if (!question) {
      setErrors({ question: "Question is required" });
      return;
    }

    if (options.some((option) => option === "")) {
      setErrors({ options: "All options are required" });
      return;
    }

    setQuizList([
      ...quizList,
      {
        question,
        options,
      },
    ]);

    toastSuccess({ message: "Successful! Question Added" });

    setQuestion("");
    setOptions(["", "", "", ""]);
    setErrors({
      question: "",
      options: "",
    });
  };

  const handleUpload = () => {
    console.log(quizList);
    toastSuccess({ message: "Successful! Questions Uploaded" });
  };

  return (
    <div>
      <div className="mx-2">
        <h1 className="text-2xl font-semibold my-4">Add Quiz For Exam</h1>
        <div className="border-dashed border border-teal rounded-md p-2">
          <div className="my-3 flex flex-col">
            <Label>Question</Label>
            <TextInput
              type="text"
              value={question}
              placeholder="Enter The Question"
              error={errors.question}
              required={true}
              onChange={(e) => setQuestion(e.target.value)}
            />
            {errors.question && <ErrorMessage message={errors.question} />}
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="my-3 flex flex-col">
              <Label>Option 1</Label>
              <TextInput
                type="text"
                value={options[0]}
                placeholder="Enter Option 1"
                error={errors.options}
                required={true}
                onChange={(e) =>
                  setOptions([
                    e.target.value,
                    options[1],
                    options[2],
                    options[3],
                  ])
                }
              />
              {errors.options && <ErrorMessage message={errors.options} />}
            </div>
            <div className="my-3 flex flex-col">
              <Label>Option 2</Label>
              <TextInput
                type="text"
                value={options[1]}
                placeholder="Enter Option 2"
                error={errors.options}
                required={true}
                onChange={(e) =>
                  setOptions([
                    options[0],
                    e.target.value,
                    options[2],
                    options[3],
                  ])
                }
              />
              {errors.options && <ErrorMessage message={errors.options} />}
            </div>
            <div className="my-3 flex flex-col">
              <Label>Option 3</Label>
              <TextInput
                type="text"
                value={options[2]}
                placeholder="Enter Option 3"
                error={errors.options}
                required={true}
                onChange={(e) =>
                  setOptions([
                    options[0],
                    options[1],
                    e.target.value,
                    options[3],
                  ])
                }
              />
              {errors.options && <ErrorMessage message={errors.options} />}
            </div>
            <div className="my-3 flex flex-col">
              <Label>Option 4</Label>
              <TextInput
                type="text"
                value={options[3]}
                placeholder="Enter Option 4"
                error={errors.options}
                required={true}
                onChange={(e) =>
                  setOptions([
                    options[0],
                    options[1],
                    options[2],
                    e.target.value,
                  ])
                }
              />
              {errors.options && <ErrorMessage message={errors.options} />}
            </div>
          </div>
          <div className="flex justify-end">
            <DefaultButton
              block
              className="w-auto mx-2"
              onClick={() => {
                handleSubmit();
              }}
            >
              Add Question
            </DefaultButton>
          </div>
        </div>
      </div>
      <div className="mt-5 border-top" />
      <div className="mx-2">
        <div className="flex justify-between items-center flex-col md:flex-row">
          <h1 className="text-2xl font-semibold my-4">Questions For Quiz</h1>
          {!isEmpty(quizList) && (
            <DefaultButton
              block
              disabled={isEmpty(quizList) || quizList.length < 3}
              className="w-auto h-10"
              onClick={() => {
                handleUpload();
              }}
            >
              Upload The Question
            </DefaultButton>
          )}
        </div>
        <div className="border-dashed border border-teal rounded-md p-2">
          <BodyListItem list={quizList} />
        </div>
      </div>
    </div>
  );
}

export default AddQuizForm;
