// ============================================================
// Ex. No: 9  WORKING WITH MONGODB USING SHELL COMMANDS
// Theme    : Science Fair Project Site
// Database : ScienceFairDB      Collection : projects
// Run      : mongosh   (then paste commands step by step)
//            or: mongosh --file Ex9_ScienceFair_MongoDB.js
// ============================================================

// ---------- Step 1: Start MongoDB Shell ----------
// In the terminal, type:
//   mongosh

// ---------- Step 2: Create and select a database ----------
use("ScienceFairDB")      // inside the interactive shell you can simply type: use ScienceFairDB
db                         // displays the current database

// ---------- Step 3: Create a collection ----------
db.createCollection("projects")
db.getCollectionNames()    // interactive shell: show collections

// ---------- Step 4: Insert documents ----------
// Insert a single project
db.projects.insertOne({
  projectId: 101,
  title: "Solar Water Heater",
  student: "Arun",
  category: "Physics",
  grade: 10,
  score: 85
})

// Insert multiple projects
db.projects.insertMany([
  {
    projectId: 102,
    title: "Plant Growth under Coloured Light",
    student: "Priya",
    category: "Biology",
    grade: 11,
    score: 92
  },
  {
    projectId: 103,
    title: "Magnetic Levitation Train",
    student: "Kumar",
    category: "Physics",
    grade: 9,
    score: 78
  },
  {
    projectId: 104,
    title: "Natural Dye pH Indicator",
    student: "Divya",
    category: "Chemistry",
    grade: 10,
    score: 88
  },
  {
    projectId: 105,
    title: "Pendulum Wave Demonstration",
    student: "Ravi",
    category: "Physics",
    grade: 12,
    score: 67
  }
])

// ---------- Step 5: Retrieve documents ----------
db.projects.find()                                  // all projects
db.projects.find().pretty()                         // readable format
db.projects.find({ student: "Priya" })              // find by student name
db.projects.findOne({ category: "Physics" })        // a single Physics project
db.projects.findOne({ projectId: 104 })             // find by project ID

// ---------- Step 6: Apply conditions to queries ----------
// Projects that scored more than 80
db.projects.find({ score: { $gt: 80 } })

// Projects by students in grade 10 to 11
db.projects.find({ grade: { $gte: 10, $lte: 11 } })

// Projects in Physics or Chemistry
db.projects.find({ category: { $in: ["Physics", "Chemistry"] } })

// Projects that scored less than 80
db.projects.find({ score: { $lt: 80 } })

// ---------- Step 7: Update documents ----------
// Update the score of Arun's project
db.projects.updateOne(
  { projectId: 101 },
  { $set: { score: 90 } }
)

// Add 5 bonus points to all Physics projects
db.projects.updateMany(
  { category: "Physics" },
  { $inc: { score: 5 } }
)

// Verify the updated records
db.projects.find()

// ---------- Step 8: Delete documents ----------
// Delete a single project
db.projects.deleteOne({ projectId: 105 })

// Delete projects that scored below 70
db.projects.deleteMany({ score: { $lt: 70 } })

// Verify the remaining records
db.projects.find()

// ---------- Step 9: Sort and limit query results ----------
// Projects in descending order of score
db.projects.find().sort({ score: -1 })

// Top three projects (podium winners)
db.projects.find()
  .sort({ score: -1 })
  .limit(3)

// ---------- Step 10: Count documents ----------
db.projects.countDocuments()                          // total projects
db.projects.countDocuments({ category: "Physics" })   // Physics projects

// ---------- Step 11: Display database information ----------
// interactive shell: show dbs
db.adminCommand({ listDatabases: 1 })
db.stats()
db.projects.countDocuments()


// ============================================================
// SAMPLE QUESTIONS (themed for the Science Fair site)
// ============================================================

// ---- Q1. Project Management (ScienceFairDB / projects) ----
// a. Display all projects             -> db.projects.find()
// b. Retrieve by project ID           -> db.projects.findOne({ projectId: 102 })
// c. Projects scoring more than 80    -> db.projects.find({ score: { $gt: 80 } })
// d. Update a project's score         -> db.projects.updateOne({ projectId: 103 }, { $set: { score: 82 } })
// e. Delete by project ID             -> db.projects.deleteOne({ projectId: 103 })

// ---- Q2. Judges (JudgesDB / judges)  [equivalent of EmployeeDB] ----
use("JudgesDB")
db.judges.insertMany([
  { judgeId: 1, name: "Dr. Meena",   field: "Physics",     honorarium: 5000, experience: 12 },
  { judgeId: 2, name: "Prof. Suresh", field: "Biology",     honorarium: 4500, experience: 9  },
  { judgeId: 3, name: "Dr. Lakshmi", field: "Chemistry",   honorarium: 6000, experience: 15 },
  { judgeId: 4, name: "Mr. Karthik", field: "Environment", honorarium: 3500, experience: 5  },
  { judgeId: 5, name: "Dr. Anand",   field: "Physics",     honorarium: 5500, experience: 11 }
])
db.judges.find()                                                     // a. all judges
db.judges.find({ honorarium: { $gt: 4000 } })                        // b. honorarium above 4000
db.judges.updateOne({ judgeId: 4 }, { $set: { honorarium: 4000 } }) // c. update honorarium
db.judges.find().sort({ honorarium: -1 })                            // d. descending order
db.judges.countDocuments({ field: "Physics" })                       // e. count in a field

// ---- Q3. Exhibits / Lab Kits (KitDB / kits)  [equivalent of ProductDB] ----
use("KitDB")
db.kits.insertMany([
  { kitId: 1, name: "Microscope Set",     category: "Biology",   price: 1800, stock: 12 },
  { kitId: 2, name: "Circuit Kit",        category: "Physics",   price: 650,  stock: 30 },
  { kitId: 3, name: "Chemical Test Kit",  category: "Chemistry", price: 950,  stock: 0  },
  { kitId: 4, name: "Telescope",          category: "Physics",   price: 3500, stock: 5  },
  { kitId: 5, name: "Soil Testing Kit",   category: "Environment", price: 500, stock: 20 }
])
db.kits.find({ category: "Physics" })                                // a. by category
db.kits.find({ price: { $gte: 500, $lte: 2000 } })                   // b. price range
db.kits.updateOne({ kitId: 2 }, { $inc: { stock: 10 } })             // c. increase stock
db.kits.deleteMany({ stock: 0 })                                     // d. delete out-of-stock
db.kits.find().sort({ price: -1 }).limit(5)                          // e. five most expensive

// ---- Q4. Reference Library (LibraryDB / books) ----
use("LibraryDB")
db.books.insertMany([
  { bookId: 1, title: "Physics for Young Scientists", author: "R. Sharma", category: "Physics",   price: 450 },
  { bookId: 2, title: "Easy Chemistry Experiments",   author: "S. Iyer",   category: "Chemistry", price: 380 },
  { bookId: 3, title: "The Living World",             author: "M. Nair",   category: "Biology",   price: 520 },
  { bookId: 4, title: "Green Earth Projects",         author: "P. Rao",    category: "Environment", price: 300 },
  { bookId: 5, title: "Science Fair Handbook",        author: "K. Das",    category: "General",   price: 600 }
])
db.books.find()
db.books.find({ author: "S. Iyer" })                                 // a. books by a specified author
db.books.find({ category: "Physics" })                               // b. books in a particular category
db.books.updateOne({ bookId: 3 }, { $set: { price: 550 } })          // c. update the price of a book
db.books.find().sort({ title: 1 })                                   // d. sort alphabetically by title
db.books.countDocuments()                                            // e. count books in the collection

// ---- Q5. Query Operations (ScienceFairDB / projects) ----
use("ScienceFairDB")
db.projects.find({ score: { $gte: 75 } })                            // a. score >= 75
db.projects.find({ grade: { $lt: 11 } })                             // b. grade below 11 (equivalent of age < 21)
db.projects.find({ category: { $in: ["Physics", "Biology"] } })      // c. Physics or Biology
db.projects.find().sort({ score: -1 }).limit(3)                      // d. top three projects
db.projects.updateMany({ grade: 10 }, { $set: { reviewed: true } })  // e. update multiple records
db.projects.find()
