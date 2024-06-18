import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#080710',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft:15,
    paddingRight:15,
    flexGrow: 1,
  },
  h1: {
    fontSize: 40,
    color: '#fff',
    fontWeight: '600',
  },
  h2:{
    fontSize: 32,
    fontWeight:'500',
    textAlign:'center',
    color:'#fff',
  },
  h6:{  
      fontSize:17,
      fontWeight:'500',
      color:'#ffffff'
  },
  btn: {
    padding: 15,
    borderRadius: 5,
    backgroundColor: '#ffffff',
    width:'100%',
  },
  btn_text: {
    color: '#080710',
    fontWeight: '600',
    fontSize: 18,
    textAlign: 'center',
  },
  form_wrapper:{
    backgroundColor:'rgba(255,255,255,0.13)',
    borderRadius:10,
    borderWidth:1,
    borderColor:'#ffffff36',
   padding:20,
   width:'100%',
   marginTop:20,
   marginBottom:20
  },
  inputfield:{
    backgroundColor:'rgba(255,255,255,0.07)',
    padding:10,
    borderRadius:4,
    marginTop:10,
    color:'#fff',
  },
  inputwrapper:{
    marginBottom:30
  },
  errortext:{
    color:'red',
    fontSize:12,
    paddingTop:2,
    fontWeight:'400'
  },
  mediaContainer: {
   margin:10,
    alignItems: 'center',
    // justifyContent: 'center',
    flex:1
  },
  media: {
    width:380,
    height:380,
    borderRadius: 10,
  },
});
export default styles;
