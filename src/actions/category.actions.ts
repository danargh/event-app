"use server";

import { CreateCategoryParams } from "@/interfaces";
import { handleError } from "@/utils/index";
import { db } from "@/lib/database";
import { getCategories, createCategory } from "@/models/category";

export const createCategoryAction = async ({
   categoryName,
}: CreateCategoryParams) => {
   try {
      await db.$connect();

      const newCategory = await createCategory({ categoryName });

      return JSON.parse(JSON.stringify(newCategory));
   } catch (error) {
      handleError(error);
   }
};

export const getAllCategoriesAction = async () => {
   try {
      await db.$connect();

      const categories = await getCategories();

      return JSON.parse(JSON.stringify(categories));
   } catch (error) {
      handleError(error);
   }
};
