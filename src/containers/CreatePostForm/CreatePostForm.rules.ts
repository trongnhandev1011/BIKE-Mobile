const CreatePostFormRules = {
  role: undefined,
  startStationId: { required: "Field is required" },
  endStationId: { required: "Field is required" },
  startTime: undefined,
  title: undefined,
  description: { required: "Field is required" },
};

export default CreatePostFormRules;
