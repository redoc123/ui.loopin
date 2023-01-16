export function getRemoteSelectData() {
  return new Promise<any>((resolve, reject) => {
    setTimeout(() => {
      // There is a probability of error in the simulation interface call
      if (Math.random() > 0.5) {
        resolve({
          code: 0,
          data: [
            {
              key: 1,
              label: "apple",
              value: 1
            },
            {
              key: 2,
              label: "banana",
              value: 2
            },
            {
              key: 3,
              label: "tangerine",
              value: 3
            }
          ],
          message: "success"
        })
      } else {
        reject(new Error("Accidentally made a mistake!"))
      }
    }, 3000)
  })
}

export interface IBirdsItem {
  id: number
  name: string
}

export const getBirds = () => {
  return new Promise<IBirdsItem[]>((resolve) => {
    setTimeout(() => {
      resolve([...Array(5)].map((_t, index) => ({ id: index, name: `t${index}` })))
    }, 1000)
  })
}

export const getCars = (id: number) => {
  return new Promise((_resolve, reject) => {
    setTimeout(() => {
      reject(new Error("sorry" + id))
    }, 1000)
  })
}
