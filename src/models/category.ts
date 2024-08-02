import { db } from "@/lib/database";

export const getCategories = async () => {
   try {
      const categories = await db.category.findMany();
      return categories;
   } catch (error) {
      return null;
   }
};

export const createCategory = async ({
   categoryName,
}: {
   categoryName: string;
}) => {
   try {
      const category = await db.category.create({
         data: {
            name: categoryName,
         },
      });
      return category;
   } catch (error) {
      return null;
   }
};
