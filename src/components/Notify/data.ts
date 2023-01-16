export interface IListItem {
  avatar?: string
  title: string
  datetime?: string
  description?: string
  status?: "" | "success" | "info" | "warning" | "danger"
  extra?: string
}

export const notifyData: IListItem[] = [
  {
    avatar: "https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png",
    title: "V3 Admin Vite is online",
    datetime: "half year ago",
    description:
      "A free and open source middle and background management system basic solution, based on mainstream technologies such as Vue3, TypeScript, Element Plus, Pinia and Vite"
  },
  {
    avatar: "https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png",
    title: "V3 Admin online",
    datetime: "a year ago",
    description: "A basic solution for middle and backend management system, based on Vue3, TypeScript, Element Plus and Pinia"
  }
]

export const messageData: IListItem[] = [
  {
    avatar: "https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png",
    title: "From Truman's World",
    description: "If I never see you again, good morning, good afternoon and good night",
    datetime: "1998-06-05"
  },
  {
    avatar: "https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png",
    title: "From Westward Journey",
    description: "If I have to add a time limit to this love, I hope it will be 10,000 years",
    datetime: "1995-02-04"
  },
  {
    avatar: "https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png",
    title: "from Totoro",
    description: "With good intentions, you will surely meet an angel on your way",
    datetime: "1988-04-16"
  }
]

export const todoData: IListItem[] = [
  {
    title: "mission name",
    description: "This guy is so lazy, he did not move his finger once here",
    extra: "has not started",
    status: "info"
  },
  {
    title: "mission name",
    description: "This guy is so lazy, he did not move his finger once here",
    extra: "processing",
    status: ""
  },
  {
    title: "mission name",
    description: "This guy is so lazy, he did not move his finger once here",
    extra: "timed out",
    status: "danger"
  }
]
