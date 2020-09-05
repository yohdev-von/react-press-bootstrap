import React, { useEffect} from 'react';
import NoMatch from '../NoMatch';
import axios from 'axios';
import { Row, Container, Col } from 'react-bootstrap';


const Post = (props) => {

    const [post, setPost] = React.useState([]);
    const [isMounted, setIsMounted] = React.useState(false);
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [slug] = React.useState(`${props.location.pathname}`);
    const [postID, setPostID] = React.useState([]);
    const [date, setDate] = React.useState([]);
    const [title, setTitle] = React.useState([]);
    const [featuredMedia, setImgID] = React.useState([]);
    const [source_url, setSourceUrl] = React.useState([]);
    const [content, setContent] = React.useState([]);

    //inital request to GET posts
    useEffect(() => {
        const getPosts = () => {
    
            axios.get(`https://admin.react-press.net/wp-json/wp/v2/posts/`)
        
            .then((resp) => {
              
              setIsLoaded(true);
                resp.data.map(post => {
                  
                  let idx = post.slug;
        
                  if(slug === '/' + idx){
                    
                    setPost(post);
                    setPostID(post.id);
                    setContent(post.content);
                    setImgID(post.featured_media);
                    setIsMounted(true);

                   }
                })
              }
            )
            .catch((err) => {
              console.log(err)
            })
          }
          getPosts();
        }, [])

  //set the endpoints needed for single post in state
  useEffect(() => {
      if (isMounted) {    

        const getImageUrl = axios.get(`https://admin.react-press.net/wp-json/wp/v2/media/${featuredMedia}`)
        
          .then((featured_image) => {
            setSourceUrl(featured_image.data.source_url);
            setDate(post.date);
            setTitle(post.title.rendered);
            console.log(post)
          }) 
      }

}, [isMounted])

if(isLoaded && isMounted){
    return (
      <React.Fragment>
      <div className="single-post">
      <Container fluid>
      <Row className="hero" 
        style={{backgroundImage: ` linear-gradient(black, black), url(${source_url})`}}>
        <Col md={6}>
        <h1>{title}</h1>
        <p>The single image block has three variations. single image left, single image right, and single image fluid. The single image can have a caption, and the suggested size is __. The stylesheet is located</p>
        </Col>
      </Row>
      </Container>        
    <Container>
        <Row className="single-post-content">
          <div dangerouslySetInnerHTML={{__html: post.content.rendered}}></div>
        </Row>
    </Container>  
    </div>
    </React.Fragment>  
    )
    } else if(!isMounted && isLoaded){
      
      return <NoMatch/>

    } else {
      return <h3>Loading ...</h3>
    } 
    
}

export default Post;