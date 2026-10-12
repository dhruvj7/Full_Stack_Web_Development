const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favouriteBlog = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  return blogs.reduce((mostLiked, blog) => (
    blog.likes > mostLiked.likes ? blog : mostLiked
  ), blogs[0])
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const blogCounts = blogs.reduce((counts, blog) => {
    counts[blog.author] = (counts[blog.author] || 0) + 1
    return counts
  }, {})

  const [author, count] = Object.entries(blogCounts).reduce((most, current) => (
    current[1] > most[1] ? current : most
  ))

  return { author, blogs: count }
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const likesByAuthor = blogs.reduce((totals, blog) => {
    totals[blog.author] = (totals[blog.author] || 0) + blog.likes
    return totals
  }, {})

  const [author, likes] = Object.entries(likesByAuthor).reduce((most, current) => (
    current[1] > most[1] ? current : most
  ))

  return { author, likes }
}

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes,
}
