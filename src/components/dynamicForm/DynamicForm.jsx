import React from "react";
import styles from "./DynamicForm.module.css";
import { useForm } from "react-hook-form";

function DynamicForm() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const onSubmit = (data) => console.log(data);

  const firstInput = watch("firstInput");
  const secondInput = watch("secondInput");

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
        <label>First input:</label>
        <input
          {...register("firstInput", {
            required: true,
            minLength: 3,
            maxLength: 10,
          })}
        />
        {errors.firstInput && <p className={styles.error}>Enter the text.</p>}
        {errors.firstInput && errors.firstInput.type === "minLength" && (
          <p className={styles.error}>Must be at least 3 characters</p>
        )}
        {errors.firstInput && errors.firstInput.type === "maxLength" && (
          <p className={styles.error}>Must be no more than 10 characters</p>
        )}

        {firstInput && !errors.firstInput && (
          <>
            <label>Second input:</label>
            <input
              {...register("secondInput", {
                required: true,
                pattern: /^\d{10}$/,
                minLength: 10,
                maxLength: 10,
              })}
            />
            {errors.secondInput && (
              <p className={styles.error}>Enter the text.</p>
            )}
            {errors.secondInput?.type === "pattern" && (
              <p className={styles.error}>Must contain only numbers</p>
            )}
            {errors.secondInput?.type === "minLength" && (
              <p className={styles.error}>Must be at least 10 characters</p>
            )}
            {errors.secondInput?.type === "maxLength" && (
              <p className={styles.error}>Must be no more than 10 characters</p>
            )}
          </>
        )}
        {secondInput && !errors.secondInput && (
          <>
            <label>Last input:</label>

            <input {...register("lastInput", { required: true })} />
            {errors.lastInput && (
              <p className={styles.error}>Enter the text.</p>
            )}
          </>
        )}
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default DynamicForm;
