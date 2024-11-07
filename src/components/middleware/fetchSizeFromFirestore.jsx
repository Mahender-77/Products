import { query, where, getDocs, collection } from "firebase/firestore";
import { db } from "../firebase";
// Action to fetch size from Firestore
export const fetchSizeFromFirestore = () => {
  return async (dispatch) => {
    try {
      const snapShot = query(collection(db, "Products"), where("state", "==", true));
      const data = await getDocs(snapShot);
     const size=data.size

      // Dispatch an action to update the state with the size
      dispatch({ type: "SET_SIZE", payload:size });

    } catch (error) {
      console.error("Error fetching size: ", error);
    }
  };
};
