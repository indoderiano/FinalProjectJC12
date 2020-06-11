import React ,{Component} from 'react'
import Axios from 'axios'
import {APIURL} from '../supports/ApiUrl'
import {
    Grid,
    Header,
    Image,
    Form,
    Segment,
    Button,
    Message,
    Container,
    Input,
    TextArea,
    Checkbox,
    Icon,
    Divider
} from 'semantic-ui-react'
import {Redirect} from 'react-router-dom'

class Product extends Component {
    state = {  }
    render() { 
        return ( 
            <Container style={{paddingTop:'2em',width:'800px'}}>

                <Grid>
                    <Grid.Row>
                        <Segment>
                            <Grid.Column width={16}>
                                asdfasdf
                            </Grid.Column>
                        </Segment>
                    </Grid.Row>
                </Grid>

            </Container>
         );
    }
}
 
export default Product;