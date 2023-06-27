package lk.ijse.book_catalog.service;

import lk.ijse.book_catalog.dto.BookDTO;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.ArrayList;

public interface BookService {
    ArrayList<BookDTO> getAllBooks();

    BookDTO getBookById(String bookId);

    boolean deleteById(String bookId);

    boolean updateById(double price,String bookId);

    void saveBook(BookDTO bookDTO);
}
