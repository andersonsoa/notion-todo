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

export const addTodo = async (task: string): Promise<Todo | undefined> => {
  if (DATABASE_ID) {
    const response = await notion.pages.create({
      parent: {
        database_id: DATABASE_ID,
      },
      properties: {
        task: {
          type: "title",
          title: [{ type: "text", text: { content: task } }],
        },
        done: {
          type: "checkbox",
          checkbox: false,
        },
      },
    });

    return { id: response.id, task, done: false, created_at: new Date(response.created_time) };
  }
};

export const updateTodoDone = async (id: string, done: boolean): Promise<boolean | undefined> => {
  if (DATABASE_ID) {
    await notion.pages.update({
      page_id: id,
      properties: {
        done: {
          type: "checkbox",
          checkbox: done,
        },
      },
    });

    return true;
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
