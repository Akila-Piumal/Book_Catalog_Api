package lk.ijse.book_catalog.repo;

import lk.ijse.book_catalog.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface BookRepo extends JpaRepository<Book,String> {
    Book findByBookId(String bookId);

    @Modifying
    @Query(value = "delete from Book where book_id=?1",nativeQuery = true)
    int deleteBookById(String bookId);

    @Modifying
    @Query(value = "update Book set price=?1 where book_id=?2",nativeQuery = true)
    int updateBookById(double price,String bookId);
}
