
const dummy = (array) =>{
    return 1
}

const totalLikes = (array) =>{

    const reducer = (sum,item) =>{
        return sum += item.likes
    }
    return array.reduce(reducer,0)
}


const favoriteBlog = (array) =>{
    const blogLikes = array.map((blog)=>{
        return blog.likes
    })
    const max = Math.max(...blogLikes)
    const maxi = array.findIndex((blog)=>blog.likes === max)
    const favoriteBlog = array[maxi]
    return array.length === 0 ? {} :{
        likes: favoriteBlog.likes,
        author: favoriteBlog.author,
        title: favoriteBlog.title
    }
}

const mostBlogs = (blogs) =>{

    const reducer =(accumulator,blog) => {
        if(accumulator[blog.author] ){

        accumulator[blog.author] += 1
        }
        else{
            accumulator[blog.author]= 1
        }
        return accumulator
    }
    const authorBlogsCount = blogs.reduce(reducer,{})
    const arrayAuthorBlogsCount = Object.keys(authorBlogsCount).map((key)=>{
        return {author: key,blogs: authorBlogsCount[key]}
    })
    const max = Math.max(...Object.values(authorBlogsCount))
    const mostBlogsAuthor = arrayAuthorBlogsCount.filter((item)=>item.blogs=== max)
    return mostBlogsAuthor[0] 





    // return author with largest amount of blogs , number of blogs
}

const mostLikes = (blogs)=>{
    const reducer = (accum,blog) => {
        if(accum[blog.author]){
            accum[blog.author]+= blog.likes
        }
        else{
            accum[blog.author] = blog.likes
        }
        return accum
    }
    const authorsTotalLikes = blogs.reduce(reducer,{})
    const authorsTotalLikesArray = Object.keys(authorsTotalLikes).map((key)=>{
        return {name: key, likes: authorsTotalLikes[key]}
    })
    const likes = authorsTotalLikesArray.map((author)=>author.likes)
    const max = Math.max(...likes)
    const authorWithMaxLikes = authorsTotalLikesArray.find((author)=> author.likes === max)
    return authorWithMaxLikes
}


module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes

}