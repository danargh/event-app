import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { Category as ICategory } from "@prisma/client";
import { startTransition, useEffect, useState } from "react";
import {
   AlertDialog,
   AlertDialogAction,
   AlertDialogCancel,
   AlertDialogContent,
   AlertDialogDescription,
   AlertDialogFooter,
   AlertDialogHeader,
   AlertDialogTitle,
   AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "../ui/input";
import {
   getAllCategoriesAction,
   createCategoryAction,
} from "@/actions/category.actions";
import { Button } from "./button";

type DropdownProps = {
   value?: string;
   onChangeHandler?: () => void;
};

const Dropdown = ({ value, onChangeHandler }: DropdownProps) => {
   const [categories, setCategories] = useState<ICategory[]>([]);
   const [newCategory, setNewCategory] = useState("");

   const handleAddCategory = () => {
      createCategoryAction({
         categoryName: newCategory.trim(),
      }).then((category) => {
         setCategories((prevState) => [...prevState, category]);
      });
   };

   useEffect(() => {
      const getCategories = async () => {
         const categoryList = await getAllCategoriesAction();

         categoryList && setCategories(categoryList as ICategory[]);
      };

      getCategories();
   }, []);

   return (
      <Select onValueChange={onChangeHandler} defaultValue={value}>
         <SelectTrigger className="">
            <SelectValue placeholder="Category" />
         </SelectTrigger>
         <SelectContent>
            {categories.length > 0 &&
               categories.map((category) => (
                  <SelectItem
                     key={category.id}
                     value={category.id}
                     className=""
                  >
                     {category.name}
                  </SelectItem>
               ))}

            <AlertDialog>
               <AlertDialogTrigger className="w-full bg-primary text-white rounded-md py-2 text-sm">
                  Add Category
               </AlertDialogTrigger>
               <AlertDialogContent className="bg-white">
                  <AlertDialogHeader>
                     <AlertDialogTitle>New Category</AlertDialogTitle>
                     <AlertDialogDescription>
                        <Input
                           type="text"
                           placeholder="Category name"
                           className=""
                           onChange={(e) => setNewCategory(e.target.value)}
                        />
                     </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                     <AlertDialogCancel>Cancel</AlertDialogCancel>
                     <AlertDialogAction
                        onClick={() => startTransition(handleAddCategory)}
                     >
                        Add
                     </AlertDialogAction>
                  </AlertDialogFooter>
               </AlertDialogContent>
            </AlertDialog>
         </SelectContent>
      </Select>
   );
};

export default Dropdown;
