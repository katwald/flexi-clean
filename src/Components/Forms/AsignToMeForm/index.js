import React, { useState } from "react";

const AssignToMeForm = () => {
  const [value, setValue] = useState("");
  const handleAssignSchedule = (event) => {
    event.preventDefault();
    // dispatch
  };
  return (
    <div>
      <form onSubmit={handleAssignSchedule}>
        <input
          name="name"
          value={value}
          onChange={(target) => setValue(target.value)}
        />
      </form>
    </div>
  );
};

export default AssignToMeForm;
