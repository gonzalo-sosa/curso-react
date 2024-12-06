import { useEffect } from "react";

const useDocumentTitle = (title: string) => {
  useEffect(
    () => {
      /*componentDidMount*/
      document.title = title;

      /*componentWillUnmount*/
      return () => {
        console.log("Cleaning...");
      };
    },
    [title] /*componentDidUpdate*/
  );  

}
 
export default useDocumentTitle;