import useStore from "@/store/useStore";
import Counter from "./counter";

/**
 * PointsMultiplierCounter Component
 *
 * This component manages a counter for either points or a multiplier value.
 * It allows the user to increase or decrease the value based on specified
 * constraints, and it also allows direct input via an input field.
 *
 * Props:
 * - title (string): The title of the counter, which determines its purpose
 *   (either "Points" or "Multiplier").
 * - setValue (function): Function to update the value of the counter.
 * - value (number): The current value of the counter, which will be displayed
 *   and manipulated.
 *
 * State Management:
 * - The component retrieves the `startingPoints` from the store using the
 *   `useStore` hook.
 *
 * Handlers:
 * - handleIncrease: Increases the value based on the title.
 *   - For "Points": Increases by 1, up to the startingPoints.
 *   - For "Multiplier": Increases by 0.25, up to a maximum of 10.
 * - handleDecrease: Decreases the value based on the title.
 *   - For "Points": Decreases by 1, down to a minimum of 0.
 *   - For "Multiplier": Decreases by 0.25, down to a minimum of 0.
 *
 * Rendering:
 * - Renders the `Counter` component, passing it the title, increase/decrease
 *   handlers, current points value, and an input change handler.
 *
 * Input Handling:
 * - handleInputChange: Manages the input for the counter.
 *   - If the input is empty, it resets the value.
 *   - If the input is not a number, it ignores the change.
 *   - For "Multiplier", it constrains the value between 0 and 10, rounding
 *     to 2 decimal places.
 *   - For "Points", it constrains the value between 0 and `startingPoints`,
 *     also rounding to 2 decimal places.
 */

const PointsMultiplierCounter = ({ title, setValue, value }) => {
  const { startingPoints } = useStore();

  const handleIncrease = () => {
    if (title === "Points") {
      if (value < startingPoints) setValue(value + 1);
    } else if (title === "Multiplier") {
      if (value < 10) setValue(value + 0.25);
    }
  };

  const handleDecrease = () => {
    if (title === "Points") {
      if (value > 0) setValue(value - 1);
    } else if (title === "Multiplier") {
      if (value > 0) setValue(value - 0.25);
    }
  };

  return (
    <Counter
      title={title}
      increase={handleIncrease}
      decrease={handleDecrease}
      points={value}
      tailwind="w-[45%] "
      onClick={() => setValue("")}
      handleInputChange={(e) => {
        let value = e.target.value;
        if (value === "") {
          setValue(value);
          return;
        }

        if (isNaN(value)) {
          return;
        }

        if (title === "Multiplier") {
          // Parse the input as a float
          let numValue = parseFloat(value);

          // Constrain the value between 0 and 10
          if (numValue < 0) numValue = 0;
          if (numValue > 10) numValue = 10;

          // Set the value, rounded to 2 decimal places
          setValue(Math.round(numValue * 100) / 100);
        } else {
          let numValue = parseFloat(value);

          // Constrain the value between 0 and 10
          if (numValue < 0) numValue = 0;
          if (numValue > startingPoints) numValue = startingPoints;

          // Set the value, rounded to 2 decimal places
          setValue(Math.round(numValue * 100) / 100);
        }
      }}
    />
  );
};

export default PointsMultiplierCounter;
