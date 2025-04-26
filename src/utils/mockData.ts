// Mock assignee type definition
export interface Assignee {
  id: string;
  email: string;
  name: string;
}

// Mockup of assignees that can be reused across the application
export const mockAssignees: Assignee[] = [
  {
    id: "usrKYbgmgmGvjwXXO",
    email: "patrik.vulinec46@gmail.com",
    name: "Patrik Vulinec"
  },
  {
    id: "usr09kXVio3Pc0QYY",
    email: "mharalovic11@gmail.com",
    name: "Marko Haralović"
  }
]; 