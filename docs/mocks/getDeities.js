import deities from './deities.json'

const getDeities = ({
  delay = 1000, limit, cursor, input,
}) => new Promise((resolve) => {
  setTimeout(() => {
    if (!input && !limit) {
      resolve({
        entries: [],
        totalCount: 0,
        limit,
        cursor,
      })
    }
    if (input) {
      const re = new RegExp(`^${input}`);
      const retult = deities.filter((item) => re.test(item.name))
      resolve({
        entries: retult,
        totalCount: 100,
        limit,
        cursor,
      })
    }
    if (limit) {
      resolve({
        entries: deities.slice(cursor, cursor + limit),
        totalCount: 100,
        limit,
        cursor,
      })
    }
  }, delay)
})

export default getDeities
