from sqlalchemy import Column, Integer, String, Boolean, Text, Date
from database import Base

class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    description = Column(Text)
    completed = Column(Boolean, default=False)

    # kolom tambahan
    start_date = Column(Date)
    end_date = Column(Date)
    pca = Column(String(100))