
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


module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}