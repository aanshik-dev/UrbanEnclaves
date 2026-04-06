package com.RealState.Project.Repository;

import com.RealState.Project.Entity.Notification;
import org.springframework.data.jpa.repository.JpaRepository;

public interface NotificationRepository  extends JpaRepository<Notification,Long> {
}
