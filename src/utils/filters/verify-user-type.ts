export async function verifyUserType(userId: string) {
  const user = await this.prisma.users.findUnique({
    where: { id: userId },
    select: { type: true },
  });

  return user.type;
}
