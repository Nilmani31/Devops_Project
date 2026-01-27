provider "aws" {
  region = "ap-south-1"
}

resource "null_resource" "deploy_app" {

  provisioner "remote-exec" {
    inline = [
      "sudo apt update -y",
      "sudo apt install docker.io -y",
      "sudo systemctl start docker",
      "sudo systemctl enable docker",
      "sudo usermod -aG docker ubuntu",

      # Stop old containers
      "docker stop frontend_c backend_c mongo_c || true",
      "docker rm frontend_c backend_c mongo_c || true",

      # MongoDB
      "docker run -d --name mongo_c -p 27017:27017 mongo:6.0",

      # Backend
      "docker run -d --name backend_c -p 4000:4000 \
        -e MONGO_URI=mongodb://mongo_c:27017/idea_app \
        -e SESSION_SECRET=Chamsha@31# \
        --link mongo_c:mongo \
        chamsha123/project-backend:latest",

      # Frontend
      "docker run -d --name frontend_c -p 3000:3000 \
        --link backend_c:backend \
        chamsha123/project-frontend:latest"
    ]

    connection {
      type        = "ssh"
      user        = "ubuntu"
      private_key = file("/var/lib/jenkins/.ssh/kserver.pem")
      host        = "3.108.2.120"
    }
  }
}
