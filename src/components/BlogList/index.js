import {Component} from 'react'

import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import BlogItem from '../BlogItem'

import './index.css'

class BlogList extends Component {
  state = {blogsData: [], isLoading: true}

  componentDidMount() {
    this.getBlogsData()
  }

  getBlogsData = async () => {
    const response = await fetch(`https://apis.ccbp.in/blogs`)
    const data = await response.json()
    const formattedData = data.map(eachData => ({
      id: eachData.id,
      title: eachData.title,
      imageUrl: eachData.image_url,
      avatarUrl: eachData.avatar_url,
      author: eachData.author,
      topic: eachData.topic,
    }))
    this.setState({blogsData: formattedData, isLoading: false})
  }

  render() {
    const {blogsData, isLoading} = this.state

    return (
      <div className="blogs-list-container">
        {isLoading ? (
          <div data-testid="loader">
            <Loader type="TailSpin" color="#00bff" width={50} height={50} />
          </div>
        ) : (
          <ul className="blogs-list">
            {blogsData.map(eachBlogItem => (
              <BlogItem key={eachBlogItem.id} blogItemDetails={eachBlogItem} />
            ))}
          </ul>
        )}
      </div>
    )
  }
}

export default BlogList
