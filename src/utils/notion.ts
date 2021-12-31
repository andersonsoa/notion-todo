import { Client } from "@notionhq/client";
import { Page } from "@notionhq/client/build/src/api-types";

const notion = new Client({ auth: process.env.NOTION_KEY });

const DATABASE_ID = process.env.NOTION_DATABASE_ID;

type Todo = {
  id: string;
  task: string;
  done: boolean;
  created_at: Date;
};

export const getTodos = async (): Promise<Todo[] | undefined> => {
  if (DATABASE_ID) {
    const { results: pages } = await notion.databases.query({
      database_id: DATABASE_ID,
    });

    const formatedResults = formatNotionResponse(pages);

    return formatedResults;
  }
};

// utils
function formatNotionResponse(pages: Page[]): Todo[] {
  return pages.map((page) => {
    const { id, properties } = page;
    const { task, done, created_at } = properties;

    return {
      id,
      task: task.type === "title" ? task.title[0].plain_text : "",
      done: done.type === "checkbox" ? done.checkbox : false,
      created_at: created_at.type === "created_time" ? new Date(created_at.created_time) : new Date(),
    };
  });
}
