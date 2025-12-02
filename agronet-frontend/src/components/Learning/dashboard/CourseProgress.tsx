
import { Button, CircularProgress, Box, Typography, IconButton } from "@mui/material";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";

const CourseProgress = () => {
  const progress = 83; // Progress percentage

  return (
    <div className="bg-gray-100 p-4 rounded-2xl flex items-center shadow-md w-full max-w-xl relative mt-4">
      {/* Left Arrow */}
      <IconButton className="absolute left-[-50px]">
        <ArrowBackIosNew sx={{ fontSize: 24 }} />
      </IconButton>

      {/* Course Icon */}
      <img
        src="/images/farmer.png"
        alt="Spanish Course"
        className="w-12 h-12 rounded-full"
      />

      {/* Course Info */}
      <div className="flex-1 ml-4">
        <h2 className="text-lg font-bold">Modern Farming</h2>
        <p className="text-sm text-gray-600">by Bupe Chileshe</p>
      </div>

      {/* Progress Circle */}
      <Box position="relative" display="inline-flex" className="mr-4">
        <CircularProgress
          variant="determinate"
          value={progress}
          size={40}
          thickness={5}
          sx={{ color: "black" }}
        />
        <Box
          position="absolute"
          top="50%"
          left="50%"
          sx={{
            transform: "translate(-50%, -50%)",
          }}
        >
          <Typography variant="caption" component="div" fontWeight="bold">
            {`${progress}%`}
          </Typography>
        </Box>
      </Box>

      {/* Continue Button */}
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#000",
          color: "#fff",
          borderRadius: "8px",
          padding: "6px 16px",
          textTransform: "none",
        }}
      >
        Continue
      </Button>

      {/* Right Arrow */}
      <IconButton className="absolute right-[-50px]">
        <ArrowForwardIos sx={{ fontSize: 24 }} />
      </IconButton>
    </div>
  );
};

export default CourseProgress;
