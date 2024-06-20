package com.User_19.book.history;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface BookTransactionHistoryRepo extends JpaRepository<BookTransactionHistory, Integer> {

    @Query("""
            SELECT history
            FROM BookTransactionHistory history
            WHERE history.userId = :userId
            
            """)
    Page<BookTransactionHistory> findAllBorrowedBooks(Pageable pageable, String userId);

    @Query("""
            SELECT history
            FROM BookTransactionHistory history
            WHERE history.book.CreatedBy = :userId
            """)
    Page<BookTransactionHistory> findAllReturnedBooks(Pageable pageable, String userId);

    @Query("""
            SELECT COUNT(history) > 0
            FROM BookTransactionHistory history
            WHERE history.userId = :userId
            AND history.book.id = :bookId
            AND history.returnedApproved = false
            """)
    boolean isAlreadyBorrowedByUser(Integer bookId, String userId);

    @Query("""
            SELECT transaction
            FROM BookTransactionHistory transaction
            WHERE transaction.userId = :userId
            AND transaction.book.id = :bookId
            AND transaction.returned = false
            AND transaction.returnedApproved = false
            """)
    Optional<BookTransactionHistory> findByBookIdAndUserId(Integer bookId, String userId);

    @Query("""
            SELECT transaction
            FROM BookTransactionHistory transaction
            WHERE transaction.book.CreatedBy = :userId
            AND transaction.book.id = :bookId
            AND transaction.returned = true
            AND transaction.returnedApproved = false
            """)
    Optional<BookTransactionHistory> findByBookIdAndOwnerId(Integer bookId, Integer userId);
}
