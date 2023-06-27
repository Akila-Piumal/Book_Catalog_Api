
let baseUrl = "http://localhost:8080/api/v1/";

window.onload = function () {
   $('#bookDetailsSec').css('display','none');
   $('#addNewBookSec').css('display','none');
};

getAllBooks();

function getAllBooks(){
   $.ajax({
      url:baseUrl+"book",
      method:"get",
      success:function (resp){
         setBookToCards(resp.data);
      },
      error:function (error){
         console.log("error");
      }
   })
}

function setBookToCards(data){
   $('#mainSecBooks').empty();

   for(var book of data){
      $('#mainSecBooks').append(`
         <div class="card mb-3" id="booksSec" style="max-width: 540px;">
            <div class="row g-0">
                <div class="col-md-12 d-flex justify-content-center">
                    <img src="`+book.imgUrl+`" class="img-fluid rounded-start" alt="image" style="height: 165px">
                 
                </div>
                <div class="col-md-12 d-flex flex-column align-content-between">
                    <div class="card-body">
                        <h3 class="d-none">`+book.bookId+`</h3>
                        <h3 class="book-name text-center" style="height: 70px;overflow: hidden">`+book.bookName+`</h3>
                        <div class="d-flex justify-content-around">
                            <p class="book-genre "><small class="text-body-secondary bg-warning text-dark rounded px-2 py-1">`+book.genre+`</small></p>
                            <p class="book-year"><small class="text-body-secondary bg-warning text-dark rounded px-2 py-1">`+book.year+`</small></p>
                        </div>

                        <p class="book-des overflow-hidden mb-0" style="height: 74px">`+book.description+`</p>

                    </div>
                    <div class="row d-flex justify-content-center">
                        <button type="button" class="btn btn-outline-success col-5" id="btnView" onclick="(getSelectedBookId(this))">View</button>
                    </div>

                </div>
            </div>
        </div>
      `);
   }
}

// ==================================================================

// Get the Clicked Book ID
function getSelectedBookId(object){
   let bookId=$(object).parent().parent().children(':eq(0)').children(':eq(0)').text();
   localStorage.setItem("bookId",bookId);

   $('.card').css('display','none');
   $('#bookDetailsSec').css('display','block');
   $('#btnHome2').css('display','none');

   getBookDetails(bookId);
}

// Get the book details from database
function getBookDetails(bookId){
   $.ajax({
      url:baseUrl+"book?bookId="+bookId,
      method:"get",
      success:function (resp){
         setBookDetails(resp.data);
         localStorage.setItem("bookname",resp.data.bookName);
      },
      error:function (error){
         console.log("error");
      }
   })
}

// Set the book details to the view
function setBookDetails(data){
   $('#asideImage').attr("src",data.imgUrl);
   $('#publishYear').text(data.year);
   $('#authorName').text(data.authorName);
   $('#bookPrice').text(data.price.toFixed(2));
   $('#bookDesc').text(data.description);
   $('#newPriceDiv').css('display','none');
   $('#btnUpdatePrice').css('display','none');
   $('#btnCancel').css('display','none');
}

// Click the delete button
$('#btnDelete').click(function (){
   let bookId=localStorage.getItem("bookId");

   Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
   }).then((result) => {
      if (result.isConfirmed) {

         $.ajax({
            url:baseUrl+"book?bookId="+bookId,
            method:"delete",
            success:function (resp){
               $('#bookDetailsSec').css('display', 'none');
               getAllBooks();
            },
            error:function (error){
               console.log("error");
            }
         })

         Swal.fire(
             'Deleted!',
             'Your file has been deleted.',
             'success'
         )
      }
   })
})

// Click the update button
$('#btnUpdate').click(function (){

   $('#btnUpdate').css('display','none');
   $('#btnDelete').css('display','none');

   $('#newPriceDiv').css('display','block');
   $('#btnUpdatePrice').css('display','block');
   $('#btnCancel').css('display','block');
})

// Click event to update price button
$('#btnUpdatePrice').click(function (){
   let bookId=localStorage.getItem("bookId");
   let price=$('#newlyPrice').val();

   $.ajax({
      url:baseUrl+"book?price="+price+"&bookId="+bookId,
      method:"put",
      success:function (resp){
         $('#btnUpdate').css('display','block');
         $('#btnDelete').css('display','block');

         getBookDetails(localStorage.getItem("bookId"));
         $('#newlyPrice').val("")
         $('#newPriceDiv').css('display','none');
         $('#btnUpdatePrice').css('display','none');
         $('#btnCancel').css('display','none');

         Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Price Updated',
            showConfirmButton: false,
            timer: 1500
         })
      },
      error:function (error){
         console.log("error");
      }
   })
})

// Cancel the Update button
$('#btnCancel').click(function (){
   $('#newlyPrice').val("")
   $('#newPriceDiv').css('display','none');
   $('#btnUpdatePrice').css('display','none');
   $('#btnCancel').css('display','none');

   $('#btnUpdate').css('display','block');
   $('#btnDelete').css('display','block');
})

// Back to home buttton
$('#btnHome').click(function (){
   $('#bookDetailsSec').css('display','none');
   $('.card').css('display','block');
})

// Add button in main sec
$('#btnAddNew').click(function (){
   $('.card').css('display','none');
   $('#btnAddNew').css('display','none');
   $('#bookDetailsSec').css('display','none');
   $('#addNewBookSec').css('display','block');
   $('#btnHome2').css('display','block');
})

// Add button in add form

$('#btnAdd').click(function (){

   //----------- Uploading Image   ---------------------------------------

   var imgData=new FormData();

   let bookImageFile = $('#imageInput')[0].files[0];
   let bookImageFileName=$('#imageInput')[0].files[0].name;

   imgData.append("book",bookImageFile,bookImageFileName);

   var imgUrl;

   $.ajax({
      url:baseUrl+"upload",
      method:'post',
      async:false,
      contentType:false,
      processData:false,
      data:imgData,
      success:function (resp){
         imgUrl=baseUrl+resp.data.bookImgPath;
      },
      error:function (error){
         alert(error.responseText.message);
      }
   })

   //---------------- Image Uploading finished  -----------------------------

   let bookId=$('#bookIdInput').val();
   let bookName=$('#bookNameInput').val();
   let Author=$('#bookAuthorInput').val();
   let year=$('#yearInput').val();
   let description=$('#descriptionInput').val();
   let genre=$('#genreInput').val();
   let price=$('#priceInput').val();

   console.log("Image Url: "+imgUrl)

   var book={
      bookId:bookId,
      bookName:bookName,
      authorName:Author,
      genre:genre,
      year:year,
      availability:true,
      description:description,
      imgUrl:"https://upload.wikimedia.org/wikipedia/en/6/6b/DaVinciCode.jpg",
      price:price
   }

   $.ajax({
      url:baseUrl+"book",
      method:'post',
      contentType: "application/json",
      data: JSON.stringify(book),
      dataType:'json',
      success:function (resp){
         Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Book Added',
            showConfirmButton: false,
            timer: 1500
         })

         $('#bookIdInput').val("");
         $('#bookNameInput').val("");
         $('#bookAuthorInput').val("");
         $('#yearInput').val("");
         $('#descriptionInput').val("");
         $('#genreInput').val("");
         $('#priceInput').val("");
         $('#imageInput').val("");

      },
      error:function (error){
         Swal.fire({
            position: 'top-end',
            icon: 'error',
            title: JSON.parse(error.responseText).message,
            showConfirmButton: false,
            timer: 2000
         })
      }
   })

})

$('#btnHome2').click(function (){
   $('#bookDetailsSec').css('display','none');
   $('#addNewBookSec').css('display','none');
   $('#btnHome2').css('display','none');
   $('.card').css('display','block');
   $('#btnAddNew').css('display','block');
   getAllBooks();
})
