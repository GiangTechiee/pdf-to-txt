# 50 câu hỏi trắc nghiệm Git (từ dễ đến khó)

> Mỗi câu chỉ có một đáp án đúng. Đáp án nằm ngay dưới từng câu.

---

## Phần 1 – Cơ bản về Git

### Câu 1

Git là gì?
A. Distributed Version Control System
B. Text editor
C. Programming language
D. Database

**Đáp án: A**

---

### Câu 2

Lệnh khởi tạo Git repository mới?
A. `git init`
B. `git start`
C. `git create`
D. `git new`

**Đáp án: A**

---

### Câu 3

Lệnh clone repository từ remote?
A. `git clone <url>`
B. `git copy <url>`
C. `git download <url>`
D. `git get <url>`

**Đáp án: A**

---

### Câu 4

Lệnh xem trạng thái working directory?
A. `git status`
B. `git state`
C. `git check`
D. `git info`

**Đáp án: A**

---

### Câu 5

Lệnh thêm file vào staging area?
A. `git add <file>`
B. `git stage <file>`
C. `git include <file>`
D. `git put <file>`

**Đáp án: A**

---

### Câu 6

Lệnh thêm tất cả files vào staging area?
A. `git add .`
B. `git add all`
C. `git add everything`
D. `git stage all`

**Đáp án: A**

---

### Câu 7

Lệnh commit changes?
A. `git commit -m "message"`
B. `git save -m "message"`
C. `git store -m "message"`
D. `git record -m "message"`

**Đáp án: A**

---

### Câu 8

Lệnh xem lịch sử commits?
A. `git log`
B. `git history`
C. `git commits`
D. `git list`

**Đáp án: A**

---

### Câu 9

Ba trạng thái chính của file trong Git?
A. Modified, Staged, Committed
B. New, Old, Deleted
C. Local, Remote, Cloud
D. Draft, Review, Final

**Đáp án: A**

---

### Câu 10

Working directory là gì?
A. Thư mục làm việc chứa files hiện tại
B. Remote repository
C. Staging area
D. Git database

**Đáp án: A**

---

## Phần 2 – Branches & Merging

### Câu 11

Lệnh tạo branch mới?
A. `git branch <name>`
B. `git create-branch <name>`
C. `git new-branch <name>`
D. `git make-branch <name>`

**Đáp án: A**

---

### Câu 12

Lệnh chuyển sang branch khác?
A. `git checkout <branch>`
B. `git switch-to <branch>`
C. `git change <branch>`
D. `git move <branch>`

**Đáp án: A**

---

### Câu 13

Lệnh tạo và chuyển sang branch mới cùng lúc?
A. `git checkout -b <branch>`
B. `git branch -c <branch>`
C. `git create-switch <branch>`
D. `git new-checkout <branch>`

**Đáp án: A**

---

### Câu 14

Lệnh xem tất cả branches?
A. `git branch`
B. `git list-branches`
C. `git show-branches`
D. `git branches`

**Đáp án: A**

---

### Câu 15

Lệnh merge branch vào branch hiện tại?
A. `git merge <branch>`
B. `git combine <branch>`
C. `git join <branch>`
D. `git unite <branch>`

**Đáp án: A**

---

### Câu 16

Lệnh xóa branch?
A. `git branch -d <branch>`
B. `git delete <branch>`
C. `git remove <branch>`
D. `git drop <branch>`

**Đáp án: A**

---

### Câu 17

Merge conflict xảy ra khi?
A. Cùng một phần code được sửa ở hai branches khác nhau
B. Branch không tồn tại
C. Không có internet
D. File quá lớn

**Đáp án: A**

---

### Câu 18

Để giải quyết merge conflict?
A. Sửa file thủ công, add và commit
B. Xóa repository
C. Tạo branch mới
D. Restart máy tính

**Đáp án: A**

---

### Câu 19

Fast-forward merge là gì?
A. Merge không tạo commit mới khi không có divergence
B. Merge rất nhanh
C. Merge tự động
D. Merge không cần resolve conflicts

**Đáp án: A**

---

### Câu 20

Lệnh xem branches đã merge vào branch hiện tại?
A. `git branch --merged`
B. `git merged-branches`
C. `git show-merged`
D. `git list-merged`

**Đáp án: A**

---

## Phần 3 – Remote Repositories

### Câu 21

Lệnh xem remote repositories?
A. `git remote -v`
B. `git list-remotes`
C. `git show-remotes`
D. `git remotes`

**Đáp án: A**

---

### Câu 22

Lệnh thêm remote repository?
A. `git remote add <name> <url>`
B. `git add-remote <name> <url>`
C. `git create-remote <name> <url>`
D. `git new-remote <name> <url>`

**Đáp án: A**

---

### Câu 23

Tên mặc định của remote repository?
A. `origin`
B. `master`
C. `main`
D. `remote`

**Đáp án: A**

---

### Câu 24

Lệnh push commits lên remote?
A. `git push origin <branch>`
B. `git upload origin <branch>`
C. `git send origin <branch>`
D. `git transfer origin <branch>`

**Đáp án: A**

---

### Câu 25

Lệnh pull changes từ remote?
A. `git pull origin <branch>`
B. `git download origin <branch>`
C. `git get origin <branch>`
D. `git receive origin <branch>`

**Đáp án: A**

---

### Câu 26

Lệnh fetch changes từ remote nhưng không merge?
A. `git fetch origin`
B. `git get origin`
C. `git download origin`
D. `git retrieve origin`

**Đáp án: A**

---

### Câu 27

Khác biệt giữa `git pull` và `git fetch`?
A. `pull` = `fetch` + `merge`, `fetch` chỉ download
B. Giống nhau hoàn toàn
C. `fetch` nhanh hơn
D. `pull` không merge

**Đáp án: A**

---

### Câu 28

Lệnh push branch lần đầu và set upstream?
A. `git push -u origin <branch>`
B. `git push --first origin <branch>`
C. `git push --new origin <branch>`
D. `git push --initial origin <branch>`

**Đáp án: A**

---

### Câu 29

Lệnh xóa remote branch?
A. `git push origin --delete <branch>`
B. `git delete-remote origin <branch>`
C. `git remove origin <branch>`
D. `git drop origin <branch>`

**Đáp án: A**

---

### Câu 30

Lệnh xem thông tin chi tiết về remote?
A. `git remote show origin`
B. `git info origin`
C. `git details origin`
D. `git describe origin`

**Đáp án: A**

---

## Phần 4 – Advanced Git

### Câu 31

Lệnh stash changes tạm thời?
A. `git stash`
B. `git save`
C. `git store`
D. `git hide`

**Đáp án: A**

---

### Câu 32

Lệnh apply stashed changes?
A. `git stash pop`
B. `git stash apply`
C. `git stash restore`
D. Cả A và B đều đúng

**Đáp án: D**

---

### Câu 33

Lệnh xem stash list?
A. `git stash list`
B. `git list-stash`
C. `git show-stash`
D. `git stashes`

**Đáp án: A**

---

### Câu 34

Lệnh revert commit (tạo commit mới đảo ngược)?
A. `git revert <commit>`
B. `git undo <commit>`
C. `git reverse <commit>`
D. `git back <commit>`

**Đáp án: A**

---

### Câu 35

Lệnh reset về commit trước (xóa commits)?
A. `git reset <commit>`
B. `git undo <commit>`
C. `git back <commit>`
D. `git return <commit>`

**Đáp án: A**

---

### Câu 36

`git reset --soft` làm gì?
A. Reset HEAD, giữ changes trong staging area
B. Xóa tất cả changes
C. Reset và xóa working directory
D. Không làm gì

**Đáp án: A**

---

### Câu 37

`git reset --hard` làm gì?
A. Reset HEAD và xóa tất cả changes
B. Chỉ reset HEAD
C. Chỉ xóa staging area
D. Không làm gì

**Đáp án: A**

---

### Câu 38

Lệnh rebase branch?
A. `git rebase <branch>`
B. `git replay <branch>`
C. `git reapply <branch>`
D. `git redo <branch>`

**Đáp án: A**

---

### Câu 39

Khác biệt giữa merge và rebase?
A. Merge tạo merge commit, rebase viết lại history
B. Giống nhau hoàn toàn
C. Rebase nhanh hơn
D. Merge viết lại history

**Đáp án: A**

---

### Câu 40

Lệnh cherry-pick commit từ branch khác?
A. `git cherry-pick <commit>`
B. `git pick <commit>`
C. `git select <commit>`
D. `git choose <commit>`

**Đáp án: A**

---

## Phần 5 – Git Best Practices & Tools

### Câu 41

Lệnh xem diff của changes chưa staged?
A. `git diff`
B. `git changes`
C. `git compare`
D. `git show-diff`

**Đáp án: A**

---

### Câu 42

Lệnh xem diff của staged changes?
A. `git diff --staged`
B. `git diff --cached`
C. `git diff --index`
D. Cả A và B đều đúng

**Đáp án: D**

---

### Câu 43

Lệnh sửa commit message của commit cuối?
A. `git commit --amend`
B. `git edit-commit`
C. `git change-message`
D. `git modify-commit`

**Đáp án: A**

---

### Câu 44

File `.gitignore` dùng để?
A. Ignore files không muốn track
B. Xóa files
C. Backup files
D. Compress files

**Đáp án: A**

---

### Câu 45

Lệnh xem ai sửa từng dòng code?
A. `git blame <file>`
B. `git who <file>`
C. `git author <file>`
D. `git history <file>`

**Đáp án: A**

---

### Câu 46

Lệnh tạo tag cho commit?
A. `git tag <name>`
B. `git mark <name>`
C. `git label <name>`
D. `git name <name>`

**Đáp án: A**

---

### Câu 47

Lệnh push tags lên remote?
A. `git push origin --tags`
B. `git push-tags origin`
C. `git upload-tags origin`
D. `git send-tags origin`

**Đáp án: A**

---

### Câu 48

Git reflog dùng để?
A. Xem lịch sử tất cả thay đổi HEAD
B. Xem remote logs
C. Xem file logs
D. Xem error logs

**Đáp án: A**

---

### Câu 49

Lệnh clean untracked files?
A. `git clean -f`
B. `git remove-untracked`
C. `git delete-untracked`
D. `git clear`

**Đáp án: A**

---

### Câu 50

Git bisect dùng để?
A. Tìm commit gây ra bug bằng binary search
B. Chia branch
C. Merge branches
D. Delete commits

**Đáp án: A**

---
