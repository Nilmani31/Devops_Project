# ---------------------------
# provider.tf
# Tell Terraform which cloud and region to use
# ---------------------------

provider "aws" {
  region = "ap-south-1"  # <-- Change if you want another region
}
