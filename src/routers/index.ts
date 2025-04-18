import { createHashRouter } from "react-router-dom";
import { publicRouter } from "./publicRouter";
// import { privateRouter } from "./privateRouter";

const router = createHashRouter([...publicRouter]);

export default router;
