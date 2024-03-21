

const CommentHandler=()=>{
    return (<form 
    className="mt-4"
    // onSubmit={()=>1}  
  >
    <div className="mb-4">
        <label className="block text-blue-800 font-medium">leave a comment below</label>
        <textarea className="border-2 border-blue-600 p-2 w-full rounded"></textarea>
    </div>

    <button 
      className="bg-blue-700 text-white font-medium py-2 px-4 rounded hover:bg-blue-600"
      // onClick={SubmitCommentHandler}
    >
      Post Comment
    </button>
  </form> )
}

export default CommentHandler