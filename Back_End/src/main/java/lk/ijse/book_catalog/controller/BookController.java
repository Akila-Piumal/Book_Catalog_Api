package lk.ijse.book_catalog.controller;

import lk.ijse.book_catalog.dto.BookDTO;
import lk.ijse.book_catalog.service.BookService;
import lk.ijse.book_catalog.util.ResponseUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping("/book")
@CrossOrigin
public class BookController {

    @Autowired
    BookService service;

    @GetMapping
    public ResponseUtil getAllBooks(){
        ArrayList<BookDTO> allBooks = service.getAllBooks();
        return new ResponseUtil("200","Success",allBooks);
    }

    @PostMapping
    public ResponseUtil saveBook(@RequestBody BookDTO bookDTO){
        System.out.println(bookDTO.getImgUrl());
        service.saveBook(bookDTO);
        return new ResponseUtil("200","Book Added",null);
    }

    @GetMapping(params = "bookId")
    public ResponseUtil getBookById(String bookId){
        BookDTO book = service.getBookById(bookId);
        return new ResponseUtil("200","Success",book);
    }

    @DeleteMapping(params = "bookId")
    public ResponseUtil deleteBookById(String bookId){
        boolean b = service.deleteById(bookId);
        return new ResponseUtil("200","Success",null);
    }

    @PutMapping(params = {"price","bookId"})
    public ResponseUtil updateBookById(double price,String bookId){
        boolean b = service.updateById(price, bookId);
        return new ResponseUtil("200","Success",null);
    }
}
